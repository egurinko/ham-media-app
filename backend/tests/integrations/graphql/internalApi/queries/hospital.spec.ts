import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';
import { setup } from '@tests/utils/setupInternalApi';

const QUERY = gql`
  query ($id: BigInt!) {
    hospital(id: $id) {
      id
      name
      url
      deleted
      internal_memo
      hospitalAddress {
        id
        address
        phone_number
        prefecture {
          name
        }
        hospitalAddressGeoLocation {
          latitude
          longitude
        }
      }
      hospitalBusinessForm {
        business_hour
        closed_day
        insurance_enabled
        remark
      }
      hospitalCertificationOption {
        nichiju_registered
        jsava_registered
      }
      hospitalInternalReputation {
        star
        remark
      }
      hospitalNightServiceOption {
        status
        remark
      }
      hospitalNightUrgentActionOption {
        status
      }
      hospitalReservationStatus {
        required
        reservable
        remark
      }
    }
  }
`;

const PREFECTURE_NAME = 'prefectureName';

const HOSPITAL_ID = 1;
const HOSPITAL_NAME = 'name';
const HOSPITAL_URL = 'https://test.com';
const HOSPITAL_INTERNAL_MEMO = 'internalMemo';
const HOSPITAL_DELETED = false;
const HOSPITAL_ADDRESS_ADDRESS = 'hospitalAddressAddress';
const HOSPITAL_ADDRESS_PHONE_NUMBER = 'hospitalAddressPhoneNumber';
const HOSPITAL_ADDRESS_GEO_LOCATION_LATITUDE = 10;
const HOSPITAL_ADDRESS_GEO_LOCATION_LONGITUDE = 20;

const HOSPITAL_BUSINESS_FORM_BUSINESS_HOUR = 'hospitalBusinessFormBusinessHour';
const HOSPITAL_BUSINESS_FORM_INSURANCE_ENABLED =
  'hospitalBusinessFormInsuranceEnabled';
const HOSPITAL_BUSINESS_FORM_CLOSED_DAY = 'hospitalBusinessFormClosedDay';
const HOSPITAL_BUSINESS_FORM_REMARK = 'hospitalBusinessFormRemark';

const HOSPITAL_CERTIFICATION_OPTION_NICHIJU_REGISTERED =
  'hospitalCertificationOptionNichijuRegisterd';
const HOSPITAL_CERTIFICATION_OPTION_JSAVA_REGISTERED =
  'hospitalCertificationOptionJsavaRegisterd';

const HOSPITAL_INTERNAL_REPUTION_STAR = 5;
const HOSPITAL_INTERNAL_REPUTION_REMARK = 'hospitalInternalReputationRemark';

const HOSPITAL_NIGHT_SERVICE_OPTION_STATUS = 'hospitalNightServiceOptionStatus';
const HOSPITAL_NIGHT_SERVICE_OPTION_REMARK = 'hospitalNightServiceOptionRemark';
const HOSPITAL_NIGHT_URGENT_ACTION_STATUS = 'hospitalNightUrgentActionStatus';

const HOSPITAL_RESERVATION_STATUS_REQUIRED =
  'hospitalReservationStatusRequired';
const HOSPITAL_RESERVATION_STATUS_RESERVABLE =
  'hospitalReservationStatusReservable';
const HOSPITAL_RESERVATION_STATUS_REMARK = 'hospitalReservationStatusRemark';

const init = async () => {
  const region = await db.region.create({ data: { name: 'region' } });
  const prefecture = await db.prefecture.create({
    data: {
      name: PREFECTURE_NAME,
      region_id: region.id,
    },
  });

  const hospital = await db.hospital.create({
    data: {
      id: HOSPITAL_ID,
      name: HOSPITAL_NAME,
      url: HOSPITAL_URL,
      internal_memo: HOSPITAL_INTERNAL_MEMO,
      deleted: HOSPITAL_DELETED,
    },
  });
  const hospitalAddress = await db.hospitalAddress.create({
    data: {
      hospital_id: hospital.id,
      address: HOSPITAL_ADDRESS_ADDRESS,
      phone_number: HOSPITAL_ADDRESS_PHONE_NUMBER,
      prefecture_id: prefecture.id,
    },
  });
  await db.hospitalAddressGeoLocation.create({
    data: {
      latitude: HOSPITAL_ADDRESS_GEO_LOCATION_LATITUDE,
      longitude: HOSPITAL_ADDRESS_GEO_LOCATION_LONGITUDE,
      hospital_address_id: hospitalAddress.id,
    },
  });
  await db.hospitalBusinessForm.create({
    data: {
      hospital_id: hospital.id,
      business_hour: HOSPITAL_BUSINESS_FORM_BUSINESS_HOUR,
      closed_day: HOSPITAL_BUSINESS_FORM_CLOSED_DAY,
      remark: HOSPITAL_BUSINESS_FORM_REMARK,
      insurance_enabled: HOSPITAL_BUSINESS_FORM_INSURANCE_ENABLED,
    },
  });
  await db.hospitalCertificationOption.create({
    data: {
      hospital_id: hospital.id,
      nichiju_registered: HOSPITAL_CERTIFICATION_OPTION_NICHIJU_REGISTERED,
      jsava_registered: HOSPITAL_CERTIFICATION_OPTION_JSAVA_REGISTERED,
    },
  });
  await db.hospitalInternalReputation.create({
    data: {
      hospital_id: hospital.id,
      star: HOSPITAL_INTERNAL_REPUTION_STAR,
      remark: HOSPITAL_INTERNAL_REPUTION_REMARK,
    },
  });
  await db.hospitalNightServiceOption.create({
    data: {
      hospital_id: hospital.id,
      status: HOSPITAL_NIGHT_SERVICE_OPTION_STATUS,
      remark: HOSPITAL_NIGHT_SERVICE_OPTION_REMARK,
    },
  });
  await db.hospitalNightUrgentActionOption.create({
    data: {
      hospital_id: hospital.id,
      status: HOSPITAL_NIGHT_URGENT_ACTION_STATUS,
    },
  });
  await db.hospitalReservationStatus.create({
    data: {
      hospital_id: hospital.id,
      required: HOSPITAL_RESERVATION_STATUS_REQUIRED,
      reservable: HOSPITAL_RESERVATION_STATUS_RESERVABLE,
      remark: HOSPITAL_RESERVATION_STATUS_REMARK,
    },
  });
};

describe('hospital', () => {
  beforeEach(() => {
    return init();
  });

  describe('with valid params', () => {
    it('returns hospital', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: { id: HOSPITAL_ID },
      });

      const hospital = result.data['hospital'];
      expect(hospital.name).toEqual(HOSPITAL_NAME);
      expect(hospital.url).toEqual(HOSPITAL_URL);
      expect(hospital.internal_memo).toEqual(HOSPITAL_INTERNAL_MEMO);
      expect(hospital.deleted).toEqual(HOSPITAL_DELETED);

      expect(hospital.hospitalAddress.address).toEqual(
        HOSPITAL_ADDRESS_ADDRESS
      );
      expect(hospital.hospitalAddress.phone_number).toEqual(
        HOSPITAL_ADDRESS_PHONE_NUMBER
      );
      expect(hospital.hospitalAddress.prefecture.name).toEqual(PREFECTURE_NAME);
      expect(
        hospital.hospitalAddress.hospitalAddressGeoLocation.latitude
      ).toEqual(HOSPITAL_ADDRESS_GEO_LOCATION_LATITUDE);
      expect(
        hospital.hospitalAddress.hospitalAddressGeoLocation.longitude
      ).toEqual(HOSPITAL_ADDRESS_GEO_LOCATION_LONGITUDE);

      expect(hospital.hospitalBusinessForm.business_hour).toEqual(
        HOSPITAL_BUSINESS_FORM_BUSINESS_HOUR
      );
      expect(hospital.hospitalBusinessForm.closed_day).toEqual(
        HOSPITAL_BUSINESS_FORM_CLOSED_DAY
      );
      expect(hospital.hospitalBusinessForm.insurance_enabled).toEqual(
        HOSPITAL_BUSINESS_FORM_INSURANCE_ENABLED
      );
      expect(hospital.hospitalBusinessForm.remark).toEqual(
        HOSPITAL_BUSINESS_FORM_REMARK
      );

      expect(hospital.hospitalCertificationOption.nichiju_registered).toEqual(
        HOSPITAL_CERTIFICATION_OPTION_NICHIJU_REGISTERED
      );
      expect(hospital.hospitalCertificationOption.jsava_registered).toEqual(
        HOSPITAL_CERTIFICATION_OPTION_JSAVA_REGISTERED
      );

      expect(hospital.hospitalInternalReputation.star).toEqual(
        HOSPITAL_INTERNAL_REPUTION_STAR
      );
      expect(hospital.hospitalInternalReputation.remark).toEqual(
        HOSPITAL_INTERNAL_REPUTION_REMARK
      );

      expect(hospital.hospitalNightServiceOption.status).toEqual(
        HOSPITAL_NIGHT_SERVICE_OPTION_STATUS
      );
      expect(hospital.hospitalNightServiceOption.remark).toEqual(
        HOSPITAL_NIGHT_SERVICE_OPTION_REMARK
      );

      expect(hospital.hospitalNightUrgentActionOption.status).toEqual(
        HOSPITAL_NIGHT_URGENT_ACTION_STATUS
      );

      expect(hospital.hospitalReservationStatus.required).toEqual(
        HOSPITAL_RESERVATION_STATUS_REQUIRED
      );
      expect(hospital.hospitalReservationStatus.reservable).toEqual(
        HOSPITAL_RESERVATION_STATUS_RESERVABLE
      );
      expect(hospital.hospitalReservationStatus.remark).toEqual(
        HOSPITAL_RESERVATION_STATUS_REMARK
      );
    });
  });
});
