import gql from 'graphql-tag';
import { client, client as db } from '@/services/prisma';
import { setup } from '@tests/utils/setupPublicApi';

const QUERY = gql`
  query ($id: BigInt!) {
    hospital(id: $id) {
      id
      name
      url
      hospitalAddress {
        id
        address
        phone_number
        hospitalAddressGeoLocation {
          id
          latitude
          longitude
        }
        prefecture {
          id
          name
          region {
            id
            name
          }
        }
      }
      hospitalBusinessForm {
        business_hour
        closed_day
        insurance_enabled
        remark
      }
      hospitalCertificationOption {
        jsava_registered
        nichiju_registered
      }
      hospitalNightServiceOption {
        id
        status
        remark
      }
      hospitalNightUrgentActionOption {
        status
        id
      }
      hospitalReservationStatus {
        id
        remark
        required
        reservable
      }
      recommended
    }
  }
`;

const HOSPITAL_ID = 1;
const HOSPITAL_NAME = 'name';
const HOSPITAL_URL = 'https://test.com';
const HOSPITAL_INTERNAL_MEMO = 'internalMemo';
const ADDRESS_ADDRESS = 'hospitalAddressAddress';
const ADDRESS_PHONE_NUMBER = 'hospitalAddressPhoneNumber';
const GEO_LOCATION_LAT = 10;
const GEO_LOCATION_LNG = 20;
const REGION_NAME = '北海道';
const PREFECTURE_NAME = '北海道';
const BUSINESS_FORM_BUSINESS_HOUR = 'businessFormBusinessHour';
const BUSINESS_FORM_CLOSED_DAY = 'businessFormClosedDay';
const BUSINESS_FORM_INSURANCE_ENABLED = 'businessFormInsuranceEnabled';
const BUSINESS_FORM_REMARK = 'businessFormRemark';
const CERTIFICATION_OPTION_NICHIJU_REGISTERED = 'certNichijuRegistered';
const CERTIFICATION_OPTION_JSAVA_REGISTERED = 'certJsavaRegistered';
const NIGHT_SERVICE_OPTION_STATUS = 'nightServiceOptionStatus';
const NIGHT_SERVICE_OPTION_REMARK = 'nightServiceOptionRemark';
const NIGHT_URGENT_ACTION_OPTION_STATUS = 'nightUrgentActionOptionStatus';
const RESERVATION_STATUS_REQUIRED = 'reservationStatusRequired';
const RESERVATION_STATUS_REMARK = 'reservationStatusRemark';
const RESERVATION_STATUS_RESERVABLE = 'reservationStatusReservable';

const init = async () => {
  const hospital = await db.hospital.create({
    data: {
      id: HOSPITAL_ID,
      name: HOSPITAL_NAME,
      url: HOSPITAL_URL,
      internal_memo: HOSPITAL_INTERNAL_MEMO,
    },
  });
  const region = await db.region.create({ data: { name: REGION_NAME } });
  const prefecture = await db.prefecture.create({
    data: { name: PREFECTURE_NAME, region_id: region.id },
  });
  const hospitalAddress = await db.hospitalAddress.create({
    data: {
      address: ADDRESS_ADDRESS,
      phone_number: ADDRESS_PHONE_NUMBER,
      hospital_id: hospital.id,
      prefecture_id: prefecture.id,
    },
  });
  await db.hospitalAddressGeoLocation.create({
    data: {
      latitude: GEO_LOCATION_LAT,
      longitude: GEO_LOCATION_LNG,
      hospital_address_id: hospitalAddress.id,
    },
  });
  await db.hospitalBusinessForm.create({
    data: {
      business_hour: BUSINESS_FORM_BUSINESS_HOUR,
      closed_day: BUSINESS_FORM_CLOSED_DAY,
      insurance_enabled: BUSINESS_FORM_INSURANCE_ENABLED,
      remark: BUSINESS_FORM_REMARK,
      hospital_id: hospital.id,
    },
  });
  await db.hospitalCertificationOption.create({
    data: {
      nichiju_registered: CERTIFICATION_OPTION_NICHIJU_REGISTERED,
      jsava_registered: CERTIFICATION_OPTION_JSAVA_REGISTERED,
      hospital_id: hospital.id,
    },
  });
  await db.hospitalNightServiceOption.create({
    data: {
      status: NIGHT_SERVICE_OPTION_STATUS,
      remark: NIGHT_SERVICE_OPTION_REMARK,
      hospital_id: hospital.id,
    },
  });
  await db.hospitalNightUrgentActionOption.create({
    data: {
      status: NIGHT_URGENT_ACTION_OPTION_STATUS,
      hospital_id: hospital.id,
    },
  });
  await db.hospitalReservationStatus.create({
    data: {
      hospital_id: hospital.id,
      required: RESERVATION_STATUS_REQUIRED,
      remark: RESERVATION_STATUS_REMARK,
      reservable: RESERVATION_STATUS_RESERVABLE,
    },
  });

  await db.hospitalInternalReputation.create({
    data: { hospital_id: hospital.id, star: 3, remark: '' },
  });
};

describe('hospital', () => {
  beforeEach(async () => {
    await init();
  });

  describe('with valid params', () => {
    it('returns hospital', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: { id: HOSPITAL_ID },
      });

      expect(result.errors).toBeUndefined();
      const hospital = result.data['hospital'];
      expect(hospital.name).toEqual(HOSPITAL_NAME);
      expect(hospital.url).toEqual(HOSPITAL_URL);

      const hospitalAddress = hospital.hospitalAddress;
      expect(hospitalAddress.address).toEqual(ADDRESS_ADDRESS);
      expect(hospitalAddress.phone_number).toEqual(ADDRESS_PHONE_NUMBER);
      const hospitalAddressGeoLocation =
        hospitalAddress.hospitalAddressGeoLocation;
      expect(hospitalAddressGeoLocation.latitude).toEqual(GEO_LOCATION_LAT);
      expect(hospitalAddressGeoLocation.longitude).toEqual(GEO_LOCATION_LNG);
      const prefecture = hospitalAddress.prefecture;
      expect(prefecture.name).toEqual(PREFECTURE_NAME);
      expect(prefecture.region.name).toEqual(PREFECTURE_NAME);

      const businessForm = hospital.hospitalBusinessForm;
      expect(businessForm.business_hour).toEqual(BUSINESS_FORM_BUSINESS_HOUR);
      expect(businessForm.closed_day).toEqual(BUSINESS_FORM_CLOSED_DAY);
      expect(businessForm.insurance_enabled).toEqual(
        BUSINESS_FORM_INSURANCE_ENABLED,
      );
      expect(businessForm.remark).toEqual(BUSINESS_FORM_REMARK);

      const certificationOption = hospital.hospitalCertificationOption;
      expect(certificationOption.nichiju_registered).toEqual(
        CERTIFICATION_OPTION_NICHIJU_REGISTERED,
      );
      expect(certificationOption.jsava_registered).toEqual(
        CERTIFICATION_OPTION_JSAVA_REGISTERED,
      );

      const nightServiceOption = hospital.hospitalNightServiceOption;
      expect(nightServiceOption.status).toEqual(NIGHT_SERVICE_OPTION_STATUS);
      expect(nightServiceOption.remark).toEqual(NIGHT_SERVICE_OPTION_REMARK);

      const nightUrgentActionOption = hospital.hospitalNightUrgentActionOption;
      expect(nightUrgentActionOption.status).toEqual(
        NIGHT_URGENT_ACTION_OPTION_STATUS,
      );

      const reservationStatus = hospital.hospitalReservationStatus;
      expect(reservationStatus.required).toEqual(RESERVATION_STATUS_REQUIRED);
      expect(reservationStatus.remark).toEqual(RESERVATION_STATUS_REMARK);
      expect(reservationStatus.reservable).toEqual(
        RESERVATION_STATUS_RESERVABLE,
      );

      expect(hospital.recommended).toEqual(false);
    });

    describe('with 5 star internalReputation', () => {
      beforeEach(async () => {
        await client.hospitalInternalReputation.update({
          where: { hospital_id: HOSPITAL_ID },
          data: { star: 5 },
        });
      });

      it('returns recommended hospital', async () => {
        const client = await setup();

        const result = await client.query(QUERY, { variables: { id: 1 } });

        expect(result.errors).toBeUndefined();
        const hospital = result.data['hospital'];
        expect(hospital.name).toEqual(HOSPITAL_NAME);
        expect(hospital.url).toEqual(HOSPITAL_URL);
        expect(hospital.recommended).toEqual(true);
      });
    });
    describe('with less then 5 star internalReputation', () => {
      beforeEach(async () => {
        await client.hospitalInternalReputation.update({
          where: { hospital_id: HOSPITAL_ID },
          data: { star: 3 },
        });
      });

      it('returns not recommended hospital', async () => {
        const client = await setup();

        const result = await client.query(QUERY, { variables: { id: 1 } });

        expect(result.errors).toBeUndefined();
        const hospital = result.data['hospital'];
        expect(hospital.name).toEqual(HOSPITAL_NAME);
        expect(hospital.url).toEqual(HOSPITAL_URL);
        expect(hospital.recommended).toEqual(false);
      });
    });
  });

  describe('with invalid params', () => {
    it('returns not found with invalid hospital id', async () => {
      const client = await setup();

      const result = await client.query(QUERY, { variables: { id: 100 } });

      expect(result.data).toBeNull();
      expect(result.errors![0]?.message).toEqual('No Hospital found');
    });
  });
});
