import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation ($hospitalId: BigInt!, $status: String!) {
    updateHospitalNightUrgentActionOption(
      hospital_id: $hospitalId
      status: $status
    ) {
      status
    }
  }
`;

describe('updateHospitalNightUrgentActionOption', () => {
  const HOSPITAL_ID = 30;
  const HOSPITAL_NAME = 'name';
  const HOSPITAL_URL = 'https://example.com';
  const HOSPITAL_INTERNAL_MEMO = 'internal_memo';
  const HOSPITAL_NIGHT_URGENT_ACTION_OPTION_STATUS = '⚪︎';

  beforeEach(async () => {
    const hospital = await db.hospital.create({
      data: {
        id: HOSPITAL_ID,
        name: HOSPITAL_NAME,
        url: HOSPITAL_URL,
        internal_memo: HOSPITAL_INTERNAL_MEMO,
      },
    });
    await db.hospitalNightUrgentActionOption.create({
      data: {
        hospital_id: hospital.id,
        status: HOSPITAL_NIGHT_URGENT_ACTION_OPTION_STATUS,
      },
    });
  });

  it('returns hospitalNightUrgentActionOption', async () => {
    const client = await setup();

    const variables = {
      hospitalId: HOSPITAL_ID,
      status: '×',
    };
    const result = await client.query(QUERY, {
      variables,
    });

    expect(result.errors).toBeUndefined();

    const updateHospitalNightUrgentActionOption =
      result.data['updateHospitalNightUrgentActionOption'];
    expect(updateHospitalNightUrgentActionOption.status).toEqual(
      variables.status,
    );
  });

  it('update updateHospitalNightUrgentActionOption', async () => {
    const client = await setup();

    const variables = {
      hospitalId: HOSPITAL_ID,
      status: '×',
    };
    await client.query(QUERY, {
      variables,
    });

    const hospitalNightUrgentActionOption =
      await db.hospitalNightUrgentActionOption.findUniqueOrThrow({
        where: { hospital_id: HOSPITAL_ID },
      });

    expect(hospitalNightUrgentActionOption.status).toEqual(variables.status);
  });
});
