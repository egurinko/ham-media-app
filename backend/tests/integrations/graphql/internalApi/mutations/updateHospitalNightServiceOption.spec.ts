import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation ($hospitalId: BigInt!, $status: String!, $remark: String!) {
    updateHospitalNightServiceOption(
      hospital_id: $hospitalId
      status: $status
      remark: $remark
    ) {
      status
      remark
    }
  }
`;

describe('updateHospitalNightServiceOption', () => {
  const HOSPITAL_ID = 30;
  const HOSPITAL_NAME = 'name';
  const HOSPITAL_URL = 'https://example.com';
  const HOSPITAL_INTERNAL_MEMO = 'internal_memo';
  const HOSPITAL_NIGHT_SERVICE_OPTION_STATUS = '⚪︎';
  const HOSPITAL_NIGHT_SERVICE_OPTION_REMARK = 'remark';

  beforeEach(async () => {
    const hospital = await db.hospital.create({
      data: {
        id: HOSPITAL_ID,
        name: HOSPITAL_NAME,
        url: HOSPITAL_URL,
        internal_memo: HOSPITAL_INTERNAL_MEMO,
      },
    });
    await db.hospitalNightServiceOption.create({
      data: {
        hospital_id: hospital.id,
        status: HOSPITAL_NIGHT_SERVICE_OPTION_STATUS,
        remark: HOSPITAL_NIGHT_SERVICE_OPTION_REMARK,
      },
    });
  });

  it('returns hospitalNightServiceOption', async () => {
    const client = await setup();

    const variables = {
      hospitalId: HOSPITAL_ID,
      status: '×',
      remark: 'afterRemark',
    };
    const result = await client.query(QUERY, {
      variables,
    });

    expect(result.errors).toBeUndefined();

    const updateHospitalNightServiceOption =
      result.data['updateHospitalNightServiceOption'];
    expect(updateHospitalNightServiceOption.status).toEqual(variables.status);
    expect(updateHospitalNightServiceOption.remark).toEqual(variables.remark);
  });

  it('update updateHospitalNightServiceOption', async () => {
    const client = await setup();

    const variables = {
      hospitalId: HOSPITAL_ID,
      status: '×',
      remark: 'afterRemark',
    };
    await client.query(QUERY, {
      variables,
    });

    const hospitalNightServiceOption =
      await db.hospitalNightServiceOption.findUniqueOrThrow({
        where: { hospital_id: HOSPITAL_ID },
      });

    expect(hospitalNightServiceOption.status).toEqual(variables.status);
    expect(hospitalNightServiceOption.remark).toEqual(variables.remark);
  });
});
