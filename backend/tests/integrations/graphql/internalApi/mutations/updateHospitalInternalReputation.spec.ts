import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation ($hospitalId: BigInt!, $star: Int!, $remark: String!) {
    updateHospitalInternalReputation(
      hospital_id: $hospitalId
      star: $star
      remark: $remark
    ) {
      star
      remark
    }
  }
`;

describe('updateHospitalInternalReputation', () => {
  const HOSPITAL_ID = 30;
  const HOSPITAL_NAME = 'name';
  const HOSPITAL_URL = 'https://example.com';
  const HOSPITAL_INTERNAL_MEMO = 'internal_memo';
  const HOSPITAL_INTERNAL_REPUTATION_STAR = 1;
  const HOSPITAL_INTERNAL_REPUTATION_REMARK = 'remark';

  beforeEach(async () => {
    const hospital = await db.hospital.create({
      data: {
        id: HOSPITAL_ID,
        name: HOSPITAL_NAME,
        url: HOSPITAL_URL,
        internal_memo: HOSPITAL_INTERNAL_MEMO,
      },
    });
    await db.hospitalInternalReputation.create({
      data: {
        hospital_id: hospital.id,
        star: HOSPITAL_INTERNAL_REPUTATION_STAR,
        remark: HOSPITAL_INTERNAL_REPUTATION_REMARK,
      },
    });
  });

  it('returns hospitalInternalReputation', async () => {
    const client = await setup();

    const variables = {
      hospitalId: HOSPITAL_ID,
      star: 5,
      remark: 'afterRemark',
    };
    const result = await client.query(QUERY, {
      variables,
    });

    expect(result.errors).toBeUndefined();

    const updateHospitalInternalReputation =
      result.data['updateHospitalInternalReputation'];
    expect(updateHospitalInternalReputation.star).toEqual(variables.star);
    expect(updateHospitalInternalReputation.remark).toEqual(variables.remark);
  });

  it('update hospitalInternalReputation', async () => {
    const client = await setup();

    const variables = {
      hospitalId: HOSPITAL_ID,
      star: 5,
      remark: 'afterRemark',
    };
    await client.query(QUERY, {
      variables,
    });

    const hospitalInternalReputation =
      await db.hospitalInternalReputation.findUniqueOrThrow({
        where: { hospital_id: HOSPITAL_ID },
      });

    expect(hospitalInternalReputation.star).toEqual(variables.star);
    expect(hospitalInternalReputation.remark).toEqual(variables.remark);
  });
});
