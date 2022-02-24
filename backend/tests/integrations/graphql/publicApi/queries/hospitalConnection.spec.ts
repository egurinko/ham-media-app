import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';
import { setup } from '@tests/utils/setupPublicApi';
import { getGeoLocationMockResponse } from '@tests/fixtures/googleApi';
import * as googleApiModule from '@/services/api/googleApi';

jest
  .spyOn(googleApiModule, 'getGeoLocation')
  .mockResolvedValue(getGeoLocationMockResponse);

const QUERY = gql`
  query (
    $first: Int
    $after: String
    $searchText: String!
    $currentLocation: currentLocation
    $reservable: Boolean!
    $nightServiceOption: Boolean!
    $insuranceEnabled: Boolean!
    $jsavaOption: Boolean!
    $nichijuOption: Boolean!
  ) {
    publicHospitalConnection(
      first: $first
      after: $after
      searchText: $searchText
      currentLocation: $currentLocation
      reservable: $reservable
      nightServiceOption: $nightServiceOption
      insuranceEnabled: $insuranceEnabled
      jsavaOption: $jsavaOption
      nichijuOption: $nichijuOption
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          name
          url
        }
      }
    }
  }
`;

const REGION_NAME = '北海道';
const PREFECTURE_NAME = '北海道';

const HOSPITAL_NAME_1 = 'name1';
const HOSPITAL_URL_1 = 'https://test.com1';
const HOSPITAL_INTERNAL_MEMO_1 = 'internalMemo1';
const ADDRESS_ADDRESS_1 = 'hospitalAddressAddress1';
const ADDRESS_PHONE_NUMBER_1 = 'hospitalAddressPhoneNumber1';
const GEO_LOCATION_LAT_1 = 50;
const GEO_LOCATION_LNG_1 = 50;
const BUSINESS_FORM_BUSINESS_HOUR_1 = 'businessFormBusinessHour1';
const BUSINESS_FORM_CLOSED_DAY_1 = 'businessFormClosedDay1';
const BUSINESS_FORM_INSURANCE_ENABLED_1 = '○';
const BUSINESS_FORM_REMARK_1 = 'businessFormRemark1';
const CERTIFICATION_OPTION_NICHIJU_REGISTERED_1 = '○';
const CERTIFICATION_OPTION_JSAVA_REGISTERED_1 = '○';
const NIGHT_SERVICE_OPTION_STATUS_1 = '○';
const NIGHT_SERVICE_OPTION_REMARK_1 = 'nightServiceOptionRemark1';
const NIGHT_URGENT_ACTION_OPTION_STATUS_1 = '○';
const RESERVATION_STATUS_REQUIRED_1 = '○';
const RESERVATION_STATUS_REMARK_1 = 'reservationStatusRemark1';
const RESERVATION_STATUS_RESERVABLE_1 = '○';

const HOSPITAL_NAME_2 = 'name2';
const HOSPITAL_URL_2 = 'https://test.com2';
const HOSPITAL_INTERNAL_MEMO_2 = 'internalMemo2';
const ADDRESS_ADDRESS_2 = 'hospitalAddressAddress2';
const ADDRESS_PHONE_NUMBER_2 = 'hospitalAddressPhoneNumber2';
const GEO_LOCATION_LAT_2 = 20;
const GEO_LOCATION_LNG_2 = 20;
const BUSINESS_FORM_BUSINESS_HOUR_2 = 'businessFormBusinessHour2';
const BUSINESS_FORM_CLOSED_DAY_2 = 'businessFormClosedDay2';
const BUSINESS_FORM_INSURANCE_ENABLED_2 = '○';
const BUSINESS_FORM_REMARK_2 = 'businessFormRemark2';
const CERTIFICATION_OPTION_NICHIJU_REGISTERED_2 = '○';
const CERTIFICATION_OPTION_JSAVA_REGISTERED_2 = '○';
const NIGHT_SERVICE_OPTION_STATUS_2 = '○';
const NIGHT_SERVICE_OPTION_REMARK_2 = 'nightServiceOptionRemark2';
const NIGHT_URGENT_ACTION_OPTION_STATUS_2 = 'nightUrgentActionOptionStatus2';
const RESERVATION_STATUS_REQUIRED_2 = '○';
const RESERVATION_STATUS_REMARK_2 = 'reservationStatusRemark2';
const RESERVATION_STATUS_RESERVABLE_2 = '○';

const init = async () => {
  const region = await db.region.create({ data: { name: REGION_NAME } });
  const prefecture = await db.prefecture.create({
    data: { name: PREFECTURE_NAME, region_id: region.id },
  });

  const hospital1 = await db.hospital.create({
    data: {
      name: HOSPITAL_NAME_1,
      url: HOSPITAL_URL_1,
      internal_memo: HOSPITAL_INTERNAL_MEMO_1,
    },
  });
  const hospitalAddress1 = await db.hospitalAddress.create({
    data: {
      address: ADDRESS_ADDRESS_1,
      phone_number: ADDRESS_PHONE_NUMBER_1,
      hospital_id: hospital1.id,
      prefecture_id: prefecture.id,
    },
  });
  await db.hospitalAddressGeoLocation.create({
    data: {
      latitude: GEO_LOCATION_LAT_1,
      longitude: GEO_LOCATION_LNG_1,
      hospital_address_id: hospitalAddress1.id,
    },
  });
  await db.hospitalBusinessForm.create({
    data: {
      business_hour: BUSINESS_FORM_BUSINESS_HOUR_1,
      closed_day: BUSINESS_FORM_CLOSED_DAY_1,
      insurance_enabled: BUSINESS_FORM_INSURANCE_ENABLED_1,
      remark: BUSINESS_FORM_REMARK_1,
      hospital_id: hospital1.id,
    },
  });
  await db.hospitalCertificationOption.create({
    data: {
      nichiju_registered: CERTIFICATION_OPTION_NICHIJU_REGISTERED_1,
      jsava_registered: CERTIFICATION_OPTION_JSAVA_REGISTERED_1,
      hospital_id: hospital1.id,
    },
  });
  await db.hospitalNightServiceOption.create({
    data: {
      status: NIGHT_SERVICE_OPTION_STATUS_1,
      remark: NIGHT_SERVICE_OPTION_REMARK_1,
      hospital_id: hospital1.id,
    },
  });
  await db.hospitalNightUrgentActionOption.create({
    data: {
      status: NIGHT_URGENT_ACTION_OPTION_STATUS_1,
      hospital_id: hospital1.id,
    },
  });
  await db.hospitalReservationStatus.create({
    data: {
      hospital_id: hospital1.id,
      required: RESERVATION_STATUS_REQUIRED_1,
      remark: RESERVATION_STATUS_REMARK_1,
      reservable: RESERVATION_STATUS_RESERVABLE_1,
    },
  });

  const hospital2 = await db.hospital.create({
    data: {
      name: HOSPITAL_NAME_2,
      url: HOSPITAL_URL_2,
      internal_memo: HOSPITAL_INTERNAL_MEMO_2,
    },
  });
  const hospitalAddress2 = await db.hospitalAddress.create({
    data: {
      address: ADDRESS_ADDRESS_2,
      phone_number: ADDRESS_PHONE_NUMBER_2,
      hospital_id: hospital2.id,
      prefecture_id: prefecture.id,
    },
  });
  await db.hospitalAddressGeoLocation.create({
    data: {
      latitude: GEO_LOCATION_LAT_2,
      longitude: GEO_LOCATION_LNG_2,
      hospital_address_id: hospitalAddress2.id,
    },
  });
  await db.hospitalBusinessForm.create({
    data: {
      business_hour: BUSINESS_FORM_BUSINESS_HOUR_2,
      closed_day: BUSINESS_FORM_CLOSED_DAY_2,
      insurance_enabled: BUSINESS_FORM_INSURANCE_ENABLED_2,
      remark: BUSINESS_FORM_REMARK_2,
      hospital_id: hospital2.id,
    },
  });
  await db.hospitalCertificationOption.create({
    data: {
      nichiju_registered: CERTIFICATION_OPTION_NICHIJU_REGISTERED_2,
      jsava_registered: CERTIFICATION_OPTION_JSAVA_REGISTERED_2,
      hospital_id: hospital2.id,
    },
  });
  await db.hospitalNightServiceOption.create({
    data: {
      status: NIGHT_SERVICE_OPTION_STATUS_2,
      remark: NIGHT_SERVICE_OPTION_REMARK_2,
      hospital_id: hospital2.id,
    },
  });
  await db.hospitalNightUrgentActionOption.create({
    data: {
      status: NIGHT_URGENT_ACTION_OPTION_STATUS_2,
      hospital_id: hospital2.id,
    },
  });
  return db.hospitalReservationStatus.create({
    data: {
      hospital_id: hospital2.id,
      required: RESERVATION_STATUS_REQUIRED_2,
      remark: RESERVATION_STATUS_REMARK_2,
      reservable: RESERVATION_STATUS_RESERVABLE_2,
    },
  });
};

describe('hospitalConnection', () => {
  beforeEach(() => {
    return init();
  });

  describe('with searchText params', () => {
    it('returns sorted hospital connection', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: {
          first: 2,
          searchText: '札幌',
          reservable: true,
          nightServiceOption: true,
          insuranceEnabled: true,
          jsavaOption: true,
          nichijuOption: true,
        },
      });

      expect(result.errors).toBeUndefined();
      const hospitalConnection = result.data['publicHospitalConnection'];
      expect(hospitalConnection.pageInfo.hasNextPage).toEqual(false);
      expect(hospitalConnection.pageInfo.hasPreviousPage).toEqual(false);
      expect(hospitalConnection.pageInfo.startCursor).toBeDefined();
      expect(hospitalConnection.pageInfo.endCursor).toBeDefined();
      expect(hospitalConnection.edges.length).toEqual(2);

      const hospital1 = hospitalConnection.edges[0].node;
      expect(hospital1.name).toEqual(HOSPITAL_NAME_1);
      expect(hospital1.url).toEqual(HOSPITAL_URL_1);

      const hospital2 = hospitalConnection.edges[1].node;
      expect(hospital2.name).toEqual(HOSPITAL_NAME_2);
      expect(hospital2.url).toEqual(HOSPITAL_URL_2);
    });

    describe('with deleted', () => {
      beforeEach(async () => {
        const hospital1 = await db.hospital.findFirst({
          where: { name: HOSPITAL_NAME_1 },
        });
        await db.hospital.update({
          where: { id: hospital1.id },
          data: { deleted: true },
        });
      });

      it('returns not deleted hospitals', async () => {
        const client = await setup();

        const result = await client.query(QUERY, {
          variables: {
            first: 2,
            searchText: '札幌',
            reservable: true,
            nightServiceOption: true,
            insuranceEnabled: true,
            jsavaOption: true,
            nichijuOption: true,
          },
        });

        expect(result.errors).toBeUndefined();
        const hospitalConnection = result.data['publicHospitalConnection'];
        expect(hospitalConnection.edges.length).toEqual(1);

        const hospital2 = hospitalConnection.edges[0].node;
        expect(hospital2.name).toEqual(HOSPITAL_NAME_2);
        expect(hospital2.url).toEqual(HOSPITAL_URL_2);
      });
    });

    describe('with reservable=true', () => {
      beforeEach(async () => {
        const hospital1 = await db.hospital.findFirst({
          where: { name: HOSPITAL_NAME_1 },
        });
        await db.hospital.update({
          where: { id: hospital1.id },
          data: {
            hospitalReservationStatus: { update: { reservable: '不明' } },
          },
        });
      });

      it('returns reservable hospitals', async () => {
        const client = await setup();

        const result = await client.query(QUERY, {
          variables: {
            first: 2,
            searchText: '札幌',
            reservable: true,
            nightServiceOption: true,
            insuranceEnabled: true,
            jsavaOption: true,
            nichijuOption: true,
          },
        });

        expect(result.errors).toBeUndefined();
        const hospitalConnection = result.data['publicHospitalConnection'];
        expect(hospitalConnection.edges.length).toEqual(1);

        const hospital2 = hospitalConnection.edges[0].node;
        expect(hospital2.name).toEqual(HOSPITAL_NAME_2);
        expect(hospital2.url).toEqual(HOSPITAL_URL_2);
      });
    });

    describe('with insuranceEnabled=true', () => {
      beforeEach(async () => {
        const hospital1 = await db.hospital.findFirst({
          where: { name: HOSPITAL_NAME_1 },
        });
        await db.hospital.update({
          where: { id: hospital1.id },
          data: {
            hospitalBusinessForm: { update: { insurance_enabled: '不明' } },
          },
        });
      });

      it('returns insurance enabled hospitals', async () => {
        const client = await setup();

        const result = await client.query(QUERY, {
          variables: {
            first: 2,
            searchText: '札幌',
            reservable: true,
            nightServiceOption: true,
            insuranceEnabled: true,
            jsavaOption: true,
            nichijuOption: true,
          },
        });

        expect(result.errors).toBeUndefined();
        const hospitalConnection = result.data['publicHospitalConnection'];
        expect(hospitalConnection.edges.length).toEqual(1);

        const hospital2 = hospitalConnection.edges[0].node;
        expect(hospital2.name).toEqual(HOSPITAL_NAME_2);
        expect(hospital2.url).toEqual(HOSPITAL_URL_2);
      });
    });

    describe('with jsavaOption=true', () => {
      beforeEach(async () => {
        const hospital1 = await db.hospital.findFirst({
          where: { name: HOSPITAL_NAME_1 },
        });
        await db.hospital.update({
          where: { id: hospital1.id },
          data: {
            hospitalCertificationOption: {
              update: { jsava_registered: '不明' },
            },
          },
        });
      });

      it('returns jsava registered hospitals', async () => {
        const client = await setup();

        const result = await client.query(QUERY, {
          variables: {
            first: 2,
            searchText: '札幌',
            reservable: true,
            nightServiceOption: true,
            insuranceEnabled: true,
            jsavaOption: true,
            nichijuOption: true,
          },
        });

        expect(result.errors).toBeUndefined();
        const hospitalConnection = result.data['publicHospitalConnection'];
        expect(hospitalConnection.edges.length).toEqual(1);

        const hospital2 = hospitalConnection.edges[0].node;
        expect(hospital2.name).toEqual(HOSPITAL_NAME_2);
        expect(hospital2.url).toEqual(HOSPITAL_URL_2);
      });
    });

    describe('with nichijuOption=true', () => {
      beforeEach(async () => {
        const hospital1 = await db.hospital.findFirst({
          where: { name: HOSPITAL_NAME_1 },
        });
        await db.hospital.update({
          where: { id: hospital1.id },
          data: {
            hospitalCertificationOption: {
              update: { nichiju_registered: '不明' },
            },
          },
        });
      });

      it('returns nichiju registered hospitals', async () => {
        const client = await setup();

        const result = await client.query(QUERY, {
          variables: {
            first: 2,
            searchText: '札幌',
            reservable: true,
            nightServiceOption: true,
            insuranceEnabled: true,
            jsavaOption: true,
            nichijuOption: true,
          },
        });

        expect(result.errors).toBeUndefined();
        const hospitalConnection = result.data['publicHospitalConnection'];
        expect(hospitalConnection.edges.length).toEqual(1);

        const hospital2 = hospitalConnection.edges[0].node;
        expect(hospital2.name).toEqual(HOSPITAL_NAME_2);
        expect(hospital2.url).toEqual(HOSPITAL_URL_2);
      });
    });
  });

  describe('with current location params', () => {
    it('returns sorted hospital connection', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: {
          first: 2,
          searchText: '',
          currentLocation: { latitude: 20, longitude: 20 },
          reservable: true,
          nightServiceOption: true,
          insuranceEnabled: true,
          jsavaOption: true,
          nichijuOption: true,
        },
      });

      expect(result.errors).toBeUndefined();
      const hospitalConnection = result.data['publicHospitalConnection'];
      expect(hospitalConnection.pageInfo.hasNextPage).toEqual(false);
      expect(hospitalConnection.pageInfo.hasPreviousPage).toEqual(false);
      expect(hospitalConnection.pageInfo.startCursor).toBeDefined();
      expect(hospitalConnection.pageInfo.endCursor).toBeDefined();
      expect(hospitalConnection.edges.length).toEqual(2);

      const hospital2 = hospitalConnection.edges[0].node;
      expect(hospital2.name).toEqual(HOSPITAL_NAME_2);
      expect(hospital2.url).toEqual(HOSPITAL_URL_2);

      const hospital1 = hospitalConnection.edges[1].node;
      expect(hospital1.name).toEqual(HOSPITAL_NAME_1);
      expect(hospital1.url).toEqual(HOSPITAL_URL_1);
    });
  });
});
