import gql from 'graphql-tag';
import { setup } from '@tests/utils/setupInternalApi';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  query (
    $first: Int!
    $deleted: Boolean!
    $name: String
    $prefectureId: BigInt
  ) {
    hospitalConnection(
      first: $first
      deleted: $deleted
      name: $name
      prefectureId: $prefectureId
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          url
          deleted
          internal_memo
        }
      }
    }
  }
`;

const PREFECTURE_ID_1 = 1;
const PREFECTURE_NAME_1 = 'prefectureName1';
const PREFECTURE_ID_2 = 2;
const PREFECTURE_NAME_2 = 'prefectureName2';

const HOSPITAL_ID_1 = 1;
const HOSPITAL_NAME_1 = 'name1';
const HOSPITAL_URL_1 = 'https://test.com1';
const HOSPITAL_INTERNAL_MEMO_1 = 'internalMemo1';
const HOSPITAL_DELETED_1 = false;
const HOSPITAL_ADDRESS_ADDRESS_1 = 'hospitalAddressAddress1';
const HOSPITAL_ADDRESS_PHONE_NUMBER_1 = 'hospitalAddressPhoneNumber1';
const HOSPITAL_ID_2 = 2;
const HOSPITAL_NAME_2 = 'name2';
const HOSPITAL_URL_2 = 'https://test.com2';
const HOSPITAL_INTERNAL_MEMO_2 = 'internalMemo2';
const HOSPITAL_DELETED_2 = false;
const HOSPITAL_ADDRESS_ADDRESS_2 = 'hospitalAddressAddress2';
const HOSPITAL_ADDRESS_PHONE_NUMBER_2 = 'hospitalAddressPhoneNumber2';

const init = async () => {
  const region = await db.region.create({ data: { name: 'region' } });
  const prefecture1 = await db.prefecture.create({
    data: {
      id: PREFECTURE_ID_1,
      name: PREFECTURE_NAME_1,
      region_id: region.id,
    },
  });
  const hospital1 = await db.hospital.create({
    data: {
      id: HOSPITAL_ID_1,
      name: HOSPITAL_NAME_1,
      url: HOSPITAL_URL_1,
      internal_memo: HOSPITAL_INTERNAL_MEMO_1,
      deleted: HOSPITAL_DELETED_1,
    },
  });
  await db.hospitalAddress.create({
    data: {
      hospital_id: hospital1.id,
      address: HOSPITAL_ADDRESS_ADDRESS_1,
      phone_number: HOSPITAL_ADDRESS_PHONE_NUMBER_1,
      prefecture_id: prefecture1.id,
    },
  });

  const prefecture2 = await db.prefecture.create({
    data: {
      id: PREFECTURE_ID_2,
      name: PREFECTURE_NAME_2,
      region_id: region.id,
    },
  });
  const hospital2 = await db.hospital.create({
    data: {
      id: HOSPITAL_ID_2,
      name: HOSPITAL_NAME_2,
      url: HOSPITAL_URL_2,
      internal_memo: HOSPITAL_INTERNAL_MEMO_2,
      deleted: HOSPITAL_DELETED_2,
    },
  });
  await db.hospitalAddress.create({
    data: {
      hospital_id: hospital2.id,
      address: HOSPITAL_ADDRESS_ADDRESS_2,
      phone_number: HOSPITAL_ADDRESS_PHONE_NUMBER_2,
      prefecture_id: prefecture2.id,
    },
  });
};

describe('hospitalConnection', () => {
  beforeEach(async () => {
    await init();
  });

  describe('with valid params', () => {
    it('returns published hospitals', async () => {
      const client = await setup();

      const result = await client.query(QUERY, {
        variables: { first: 5, deleted: false },
      });
      const hospitalConnection = result.data['hospitalConnection'];
      expect(hospitalConnection.pageInfo.hasNextPage).toEqual(false);
      expect(hospitalConnection.pageInfo.endCursor).toBeDefined();

      expect(hospitalConnection.edges.length).toEqual(2);

      const hospital1 = hospitalConnection.edges[0].node;
      expect(hospital1.name).toEqual(HOSPITAL_NAME_1);
      expect(hospital1.url).toEqual(HOSPITAL_URL_1);
      expect(hospital1.deleted).toEqual(HOSPITAL_DELETED_1);
      expect(hospital1.internal_memo).toEqual(HOSPITAL_INTERNAL_MEMO_1);

      const hospital2 = hospitalConnection.edges[1].node;
      expect(hospital2.name).toEqual(HOSPITAL_NAME_2);
      expect(hospital2.url).toEqual(HOSPITAL_URL_2);
      expect(hospital2.deleted).toEqual(HOSPITAL_DELETED_2);
      expect(hospital2.internal_memo).toEqual(HOSPITAL_INTERNAL_MEMO_2);
    });

    describe('with name filter param', () => {
      it('returns name filterd hospitals', async () => {
        const client = await setup();

        const result = await client.query(QUERY, {
          variables: { first: 5, deleted: false, name: HOSPITAL_NAME_1 },
        });
        const hospitalConnection = result.data['hospitalConnection'];

        expect(hospitalConnection.edges.length).toEqual(1);

        const hospital1 = hospitalConnection.edges[0].node;
        expect(hospital1.name).toEqual(HOSPITAL_NAME_1);
        expect(hospital1.url).toEqual(HOSPITAL_URL_1);
        expect(hospital1.deleted).toEqual(HOSPITAL_DELETED_1);
        expect(hospital1.internal_memo).toEqual(HOSPITAL_INTERNAL_MEMO_1);
      });
    });

    describe('with deleted filter param', () => {
      beforeEach(async () => {
        await db.hospital.update({
          where: { id: HOSPITAL_ID_1 },
          data: { deleted: true },
        });
      });

      it('returns unpublished hospitals', async () => {
        const client = await setup();

        const result = await client.query(QUERY, {
          variables: { first: 5, deleted: true },
        });
        const hospitalConnection = result.data['hospitalConnection'];

        expect(hospitalConnection.edges.length).toEqual(1);

        const hospital1 = hospitalConnection.edges[0].node;
        expect(hospital1.name).toEqual(HOSPITAL_NAME_1);
        expect(hospital1.url).toEqual(HOSPITAL_URL_1);
        expect(hospital1.deleted).toEqual(true);
        expect(hospital1.internal_memo).toEqual(HOSPITAL_INTERNAL_MEMO_1);
      });
    });

    describe('with prefectureId filter param', () => {
      it('returns prefecture filtered hospitals', async () => {
        const client = await setup();

        const result = await client.query(QUERY, {
          variables: {
            first: 5,
            deleted: false,
            prefectureId: PREFECTURE_ID_1,
          },
        });
        const hospitalConnection = result.data['hospitalConnection'];

        expect(hospitalConnection.edges.length).toEqual(1);

        const hospital1 = hospitalConnection.edges[0].node;
        expect(hospital1.name).toEqual(HOSPITAL_NAME_1);
        expect(hospital1.url).toEqual(HOSPITAL_URL_1);
        expect(hospital1.deleted).toEqual(HOSPITAL_DELETED_1);
        expect(hospital1.internal_memo).toEqual(HOSPITAL_INTERNAL_MEMO_1);
      });
    });
  });
});
