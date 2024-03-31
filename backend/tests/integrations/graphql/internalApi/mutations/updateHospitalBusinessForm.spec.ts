import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation (
    $hospitalId: BigInt!
    $businessHour: String!
    $closedDay: String!
    $insuranceEnabled: String!
    $remark: String!
  ) {
    updateHospitalBusinessForm(
      hospital_id: $hospitalId
      business_hour: $businessHour
      closed_day: $closedDay
      insurance_enabled: $insuranceEnabled
      remark: $remark
    ) {
      business_hour
    }
  }
`;

describe('updateHospitalBusinessForm', () => {
  const HOSPITAL_ID = 30;
  const HOSPITAL_NAME = 'name';
  const HOSPITAL_URL = 'https://example.com';
  const HOSPITAL_INTERNAL_MEMO = 'internal_memo';
  const HOSPITAL_BUSINESS_FORM_BUSINESS_HOUR = 'business_hour';
  const HOSPITAL_BUSINESS_FORM_CLOSED_DAY = 'closed_day';
  const HOSPITAL_BUSINESS_FORM_INSURANCE_ENABLED = '⚪︎';
  const HOSPITAL_BUSINESS_FORM_REMARK = 'remark';

  beforeEach(async () => {
    const hospital = await db.hospital.create({
      data: {
        id: HOSPITAL_ID,
        name: HOSPITAL_NAME,
        url: HOSPITAL_URL,
        internal_memo: HOSPITAL_INTERNAL_MEMO,
      },
    });
    await db.hospitalBusinessForm.create({
      data: {
        hospital_id: hospital.id,
        business_hour: HOSPITAL_BUSINESS_FORM_BUSINESS_HOUR,
        closed_day: HOSPITAL_BUSINESS_FORM_CLOSED_DAY,
        insurance_enabled: HOSPITAL_BUSINESS_FORM_INSURANCE_ENABLED,
        remark: HOSPITAL_BUSINESS_FORM_REMARK,
      },
    });
  });

  it('returns hospitalInternalReputation', async () => {
    const client = await setup();

    const variables = {
      hospitalId: HOSPITAL_ID,
      businessHour: 'afterBusinessHour',
      closedDay: 'afterClosedDay',
      insuranceEnabled: '×',
      remark: 'afterRemark',
    };
    const result = await client.query(QUERY, {
      variables,
    });

    expect(result.errors).toBeUndefined();

    const updateHospitalBusinessForm =
      result.data['updateHospitalBusinessForm'];
    expect(updateHospitalBusinessForm.business_hour).toEqual(
      variables.businessHour,
    );
  });

  it('update hospitalBusinessForm', async () => {
    const client = await setup();

    const variables = {
      hospitalId: HOSPITAL_ID,
      businessHour: 'afterBusinessHour',
      closedDay: 'afterClosedDay',
      insuranceEnabled: '×',
      remark: 'afterRemark',
    };
    await client.query(QUERY, {
      variables,
    });

    const hospitalBusinessForm =
      await db.hospitalBusinessForm.findUniqueOrThrow({
        where: { hospital_id: HOSPITAL_ID },
      });

    expect(hospitalBusinessForm.business_hour).toEqual(variables.businessHour);
    expect(hospitalBusinessForm.closed_day).toEqual(variables.closedDay);
    expect(hospitalBusinessForm.insurance_enabled).toEqual(
      variables.insuranceEnabled,
    );
    expect(hospitalBusinessForm.remark).toEqual(variables.remark);
  });
});
