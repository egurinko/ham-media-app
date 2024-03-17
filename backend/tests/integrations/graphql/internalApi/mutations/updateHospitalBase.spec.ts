import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation (
    $id: BigInt!
    $name: String!
    $url: String!
    $internalMemo: String!
    $deleted: Boolean!
  ) {
    updateHospitalBase(
      id: $id
      name: $name
      url: $url
      internal_memo: $internalMemo
      deleted: $deleted
    ) {
      id
      name
    }
  }
`;

describe('updateHospitalBase', () => {
  const HOSPITAL_ID = 30;
  const HOSPITAL_NAME = 'name';
  const HOSPITAL_URL = 'https://example.com';
  const HOSPITAL_INTERNAL_MEMO = 'internal memo';
  const HOSPITAL_DELETED = false;

  beforeEach(async () => {
    await db.hospital.create({
      data: {
        id: HOSPITAL_ID,
        name: HOSPITAL_NAME,
        url: HOSPITAL_URL,
        internal_memo: HOSPITAL_INTERNAL_MEMO,
        deleted: HOSPITAL_DELETED,
      },
    });
  });

  it('returns hospital', async () => {
    const client = await setup();

    const variables = {
      id: HOSPITAL_ID,
      name: 'afterName',
      url: 'afterUrl',
      internalMemo: 'afterInternalMemo',
      deleted: true,
    };
    const result = await client.query(QUERY, {
      variables,
    });

    expect(result.errors).toBeUndefined();

    const updateHospitalBase = result.data['updateHospitalBase'];
    expect(updateHospitalBase.id).toEqual(variables.id);
    expect(updateHospitalBase.name).toEqual(variables.name);
  });

  it('update cart', async () => {
    const client = await setup();

    const variables = {
      id: HOSPITAL_ID,
      name: 'afterName',
      url: 'afterUrl',
      internalMemo: 'afterInternalMemo',
      deleted: true,
    };
    await client.query(QUERY, {
      variables,
    });

    const hospital = await db.hospital.findUniqueOrThrow({
      where: { id: HOSPITAL_ID },
    });

    expect(hospital.id).toEqual(BigInt(variables.id));
    expect(hospital.name).toEqual(variables.name);
    expect(hospital.url).toEqual(variables.url);
    expect(hospital.internal_memo).toEqual(variables.internalMemo);
    expect(hospital.deleted).toEqual(variables.deleted);
  });
});
