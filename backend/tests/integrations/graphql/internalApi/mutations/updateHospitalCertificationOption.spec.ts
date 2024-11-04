import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation (
    $hospitalId: BigInt!
    $jsava_registered: String!
    $nichiju_registered: String!
  ) {
    updateHospitalCertificationOption(
      hospital_id: $hospitalId
      nichiju_registered: $nichiju_registered
      jsava_registered: $jsava_registered
    ) {
      nichiju_registered
      jsava_registered
    }
  }
`;

describe('updateHospitalCertificationOption', () => {
  const HOSPITAL_ID = 30;
  const HOSPITAL_NAME = 'name';
  const HOSPITAL_URL = 'https://example.com';
  const HOSPITAL_INTERNAL_MEMO = 'internal_memo';
  const HOSPITAL_CERTIFICATION_OPTION_NICHIJU_REGISTERED = '⚪︎';
  const HOSPITAL_CERTIFICATION_OPTION_JSAVA_REGISTERED = '⚪︎';

  beforeEach(async () => {
    const hospital = await db.hospital.create({
      data: {
        id: HOSPITAL_ID,
        name: HOSPITAL_NAME,
        url: HOSPITAL_URL,
        internal_memo: HOSPITAL_INTERNAL_MEMO,
      },
    });
    await db.hospitalCertificationOption.create({
      data: {
        hospital_id: hospital.id,
        nichiju_registered: HOSPITAL_CERTIFICATION_OPTION_NICHIJU_REGISTERED,
        jsava_registered: HOSPITAL_CERTIFICATION_OPTION_JSAVA_REGISTERED,
      },
    });
  });

  it('returns hospitalCertificationOption', async () => {
    const client = await setup();

    const variables = {
      hospitalId: HOSPITAL_ID,
      nichiju_registered: '×',
      jsava_registered: '×',
    };
    const result = await client.query(QUERY, {
      variables,
    });

    expect(result.errors).toBeUndefined();

    const updateHospitalCertificationOption =
      result.data['updateHospitalCertificationOption'];
    expect(updateHospitalCertificationOption.nichiju_registered).toEqual(
      variables.nichiju_registered,
    );
    expect(updateHospitalCertificationOption.jsava_registered).toEqual(
      variables.jsava_registered,
    );
  });

  it('update updateHospitalCertificationOption', async () => {
    const client = await setup();

    const variables = {
      hospitalId: HOSPITAL_ID,
      nichiju_registered: '×',
      jsava_registered: '×',
    };
    await client.query(QUERY, {
      variables,
    });

    const hospitalCertificationOption =
      await db.hospitalCertificationOption.findUniqueOrThrow({
        where: { hospital_id: HOSPITAL_ID },
      });

    expect(hospitalCertificationOption.nichiju_registered).toEqual(
      variables.nichiju_registered,
    );
    expect(hospitalCertificationOption.jsava_registered).toEqual(
      variables.jsava_registered,
    );
  });
});
