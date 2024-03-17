import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation (
    $hospitalId: BigInt!
    $address: String!
    $phoneNumber: String!
    $prefectureId: BigInt!
  ) {
    updateHospitalAddress(
      hospital_id: $hospitalId
      address: $address
      phone_number: $phoneNumber
      prefecture_id: $prefectureId
    ) {
      address
      phone_number
      prefecture {
        id
        name
      }
    }
  }
`;

describe('updateHospitalAddress', () => {
  const HOSPITAL_ID = 30;
  const HOSPITAL_NAME = 'name';
  const HOSPITAL_URL = 'https://example.com';
  const HOSPITAL_INTERNAL_MEMO = 'internal_memo';
  const HOSPITAL_ADDRESS = 'address';
  const HOSPITAL_PHONE_NUMBER = '00011112222';
  const HOSPITAL_PREFECTURE_ID = 1;
  const HOSPITAL_PREFECTURE_ID_SECOND = 2;

  beforeEach(async () => {
    const region = await db.region.create({ data: { name: 'region' } });

    await db.prefecture.create({
      data: {
        id: HOSPITAL_PREFECTURE_ID,
        name: 'name',
        region_id: region.id,
      },
    });
    await db.prefecture.create({
      data: {
        id: HOSPITAL_PREFECTURE_ID_SECOND,
        name: 'name2',
        region_id: region.id,
      },
    });
    const hospital = await db.hospital.create({
      data: {
        id: HOSPITAL_ID,
        name: HOSPITAL_NAME,
        url: HOSPITAL_URL,
        internal_memo: HOSPITAL_INTERNAL_MEMO,
      },
    });
    await db.hospitalAddress.create({
      data: {
        hospital_id: hospital.id,
        address: HOSPITAL_ADDRESS,
        phone_number: HOSPITAL_PHONE_NUMBER,
        prefecture_id: HOSPITAL_PREFECTURE_ID,
      },
    });
  });

  it('returns hospitalAddress', async () => {
    const client = await setup();

    const variables = {
      hospitalId: HOSPITAL_ID,
      address: 'afterAddress',
      phoneNumber: 'afterPhoneNumber',
      prefectureId: HOSPITAL_PREFECTURE_ID_SECOND,
    };
    const result = await client.query(QUERY, {
      variables,
    });

    expect(result.errors).toBeUndefined();

    const updateHospitalAddress = result.data['updateHospitalAddress'];
    expect(updateHospitalAddress.address).toEqual(variables.address);
    expect(updateHospitalAddress.phone_number).toEqual(variables.phoneNumber);
    expect(updateHospitalAddress.prefecture.id).toEqual(variables.prefectureId);
  });

  it('update hospitalAddress', async () => {
    const client = await setup();

    const variables = {
      hospitalId: HOSPITAL_ID,
      address: 'afterAddress',
      phoneNumber: 'afterPhoneNumber',
      prefectureId: HOSPITAL_PREFECTURE_ID_SECOND,
    };
    await client.query(QUERY, {
      variables,
    });

    const hospitalAddress = await db.hospitalAddress.findUniqueOrThrow({
      where: { hospital_id: HOSPITAL_ID },
    });

    expect(hospitalAddress.address).toEqual(variables.address);
    expect(hospitalAddress.phone_number).toEqual(variables.phoneNumber);
    expect(hospitalAddress.prefecture_id).toEqual(
      BigInt(variables.prefectureId),
    );
  });
});
