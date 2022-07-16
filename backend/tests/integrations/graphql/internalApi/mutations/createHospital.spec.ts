import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation (
    $name: String!
    $url: String
    $deleted: Boolean!
    $internal_memo: String!
  ) {
    createHospital(
      name: $name
      url: $url
      deleted: $deleted
      internal_memo: $internal_memo
    ) {
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

describe('createHospital', () => {
  const HOSPITAL_NAME = 'hospitalName';
  const HOSPITAL_URL = 'https://example.com';
  const HOSPITAL_DELETED = false;
  const HOSPITAL_INTERNAL_NAME = 'hospitalInternalMemo';
  const PREFECTURE_ID = 1;
  const PREFECTURE_NAME = 'prefectureName';
  const date = new Date();
  const DATE = date.toLocaleDateString();

  beforeEach(async () => {
    const region = await db.region.create({ data: { name: 'test' } });
    await db.prefecture.create({
      data: { id: PREFECTURE_ID, name: PREFECTURE_NAME, region_id: region.id },
    });
  });

  it('returns hospital', async () => {
    const client = await setup();

    const result = await client.query(QUERY, {
      variables: {
        name: HOSPITAL_NAME,
        url: HOSPITAL_URL,
        deleted: HOSPITAL_DELETED,
        internal_memo: HOSPITAL_INTERNAL_NAME,
      },
    });

    expect(result.errors).toBeUndefined();

    const hospital = result.data['createHospital'];
    expect(hospital.name).toEqual(HOSPITAL_NAME);
    expect(hospital.url).toEqual(HOSPITAL_URL);
    expect(hospital.deleted).toEqual(HOSPITAL_DELETED);
    expect(hospital.internal_memo).toEqual(HOSPITAL_INTERNAL_NAME);

    expect(hospital.hospitalAddress.address).toContain(DATE);
    expect(hospital.hospitalAddress.phone_number).toContain(DATE);
    expect(hospital.hospitalAddress.prefecture.name).toEqual(PREFECTURE_NAME);
    expect(hospital.hospitalAddress.hospitalAddressGeoLocation).toBeNull();

    expect(hospital.hospitalBusinessForm.business_hour).toContain(DATE);
    expect(hospital.hospitalBusinessForm.closed_day).toContain(DATE);
    expect(hospital.hospitalBusinessForm.insurance_enabled).toEqual('不明');
    expect(hospital.hospitalBusinessForm.remark).toEqual('');

    expect(hospital.hospitalCertificationOption.nichiju_registered).toEqual(
      '不明'
    );
    expect(hospital.hospitalCertificationOption.jsava_registered).toEqual(
      '不明'
    );

    expect(hospital.hospitalInternalReputation.star).toEqual(3);
    expect(hospital.hospitalInternalReputation.remark).toEqual('');

    expect(hospital.hospitalNightServiceOption.status).toEqual('不明');
    expect(hospital.hospitalNightServiceOption.remark).toEqual('');

    expect(hospital.hospitalNightUrgentActionOption.status).toEqual('不明');

    expect(hospital.hospitalReservationStatus.required).toEqual('不明');
    expect(hospital.hospitalReservationStatus.reservable).toEqual('不明');
    expect(hospital.hospitalReservationStatus.remark).toEqual('');
  });

  it('create hospital', async () => {
    expect(await db.hospital.count()).toEqual(0);
    expect(await db.hospitalAddress.count()).toEqual(0);
    expect(await db.hospitalAddressGeoLocation.count()).toEqual(0);
    expect(await db.hospitalBusinessForm.count()).toEqual(0);
    expect(await db.hospitalCertificationOption.count()).toEqual(0);
    expect(await db.hospitalInternalReputation.count()).toEqual(0);
    expect(await db.hospitalNightServiceOption.count()).toEqual(0);
    expect(await db.hospitalNightUrgentActionOption.count()).toEqual(0);
    expect(await db.hospitalReservationStatus.count()).toEqual(0);

    const client = await setup();
    await client.query(QUERY, {
      variables: {
        name: HOSPITAL_NAME,
        url: HOSPITAL_URL,
        deleted: HOSPITAL_DELETED,
        internal_memo: HOSPITAL_INTERNAL_NAME,
      },
    });

    expect(await db.hospital.count()).toEqual(1);
    expect(await db.hospitalAddress.count()).toEqual(1);
    expect(await db.hospitalAddressGeoLocation.count()).toEqual(0);
    expect(await db.hospitalBusinessForm.count()).toEqual(1);
    expect(await db.hospitalCertificationOption.count()).toEqual(1);
    expect(await db.hospitalInternalReputation.count()).toEqual(1);
    expect(await db.hospitalNightServiceOption.count()).toEqual(1);
    expect(await db.hospitalNightUrgentActionOption.count()).toEqual(1);
    expect(await db.hospitalReservationStatus.count()).toEqual(1);

    const hospital = await db.hospital.findFirstOrThrow({
      include: {
        hospitalAddress: {
          include: { hospitalAddressGeoLocation: true, prefecture: true },
        },
        hospitalBusinessForm: true,
        hospitalCertificationOption: true,
        hospitalInternalReputation: true,
        hospitalNightServiceOption: true,
        hospitalNightUrgentActionOption: true,
        hospitalReservationStatus: true,
      },
    });
    expect(hospital.name).toEqual(HOSPITAL_NAME);
    expect(hospital.url).toEqual(HOSPITAL_URL);
    expect(hospital.deleted).toEqual(HOSPITAL_DELETED);
    expect(hospital.internal_memo).toEqual(HOSPITAL_INTERNAL_NAME);
    expect(hospital.hospitalAddress?.address).toContain(DATE);
    expect(hospital.hospitalAddress?.phone_number).toContain(DATE);
    expect(hospital.hospitalAddress?.prefecture.name).toEqual(PREFECTURE_NAME);
    expect(hospital.hospitalAddress?.hospitalAddressGeoLocation).toBeNull();

    expect(hospital.hospitalBusinessForm?.business_hour).toContain(DATE);
    expect(hospital.hospitalBusinessForm?.closed_day).toContain(DATE);
    expect(hospital.hospitalBusinessForm?.insurance_enabled).toEqual('不明');
    expect(hospital.hospitalBusinessForm?.remark).toEqual('');

    expect(hospital.hospitalCertificationOption?.nichiju_registered).toEqual(
      '不明'
    );
    expect(hospital.hospitalCertificationOption?.jsava_registered).toEqual(
      '不明'
    );

    expect(hospital.hospitalInternalReputation?.star).toEqual(3);
    expect(hospital.hospitalInternalReputation?.remark).toEqual('');

    expect(hospital.hospitalNightServiceOption?.status).toEqual('不明');
    expect(hospital.hospitalNightServiceOption?.remark).toEqual('');

    expect(hospital.hospitalNightUrgentActionOption?.status).toEqual('不明');

    expect(hospital.hospitalReservationStatus?.required).toEqual('不明');
    expect(hospital.hospitalReservationStatus?.reservable).toEqual('不明');
    expect(hospital.hospitalReservationStatus?.remark).toEqual('');
  });
});
