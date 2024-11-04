import { setup } from '@tests/utils/setupInternalApi';
import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';

const QUERY = gql`
  mutation (
    $hospitalId: BigInt!
    $required: String!
    $reservable: String!
    $remark: String!
  ) {
    updateHospitalReservationStatus(
      hospital_id: $hospitalId
      required: $required
      reservable: $reservable
      remark: $remark
    ) {
      required
      reservable
      remark
    }
  }
`;

describe('updateHospitalReservationStatus', () => {
  const HOSPITAL_ID = 30;
  const HOSPITAL_NAME = 'name';
  const HOSPITAL_URL = 'https://example.com';
  const HOSPITAL_INTERNAL_MEMO = 'internal_memo';
  const HOSPITAL_RESERVATION_STATUS_REQUIRED = '⚪︎';
  const HOSPITAL_RESERVATION_STATUS_RESERVABLE = '⚪︎';
  const HOSPITAL_RESERVATION_STATUS_REMARK = 'remark';

  beforeEach(async () => {
    const hospital = await db.hospital.create({
      data: {
        id: HOSPITAL_ID,
        name: HOSPITAL_NAME,
        url: HOSPITAL_URL,
        internal_memo: HOSPITAL_INTERNAL_MEMO,
      },
    });
    await db.hospitalReservationStatus.create({
      data: {
        hospital_id: hospital.id,
        required: HOSPITAL_RESERVATION_STATUS_REQUIRED,
        reservable: HOSPITAL_RESERVATION_STATUS_RESERVABLE,
        remark: HOSPITAL_RESERVATION_STATUS_REMARK,
      },
    });
  });

  it('returns HospitalReservationStatus', async () => {
    const client = await setup();

    const variables = {
      hospitalId: HOSPITAL_ID,
      required: '×',
      reservable: '不明',
      remark: 'afterRemark',
    };
    const result = await client.query(QUERY, {
      variables,
    });

    expect(result.errors).toBeUndefined();

    const updateHospitalReservationStatus =
      result.data['updateHospitalReservationStatus'];
    expect(updateHospitalReservationStatus.required).toEqual(
      variables.required,
    );
    expect(updateHospitalReservationStatus.reservable).toEqual(
      variables.reservable,
    );
    expect(updateHospitalReservationStatus.remark).toEqual(variables.remark);
  });

  it('update updateHospitalReservationStatus', async () => {
    const client = await setup();

    const variables = {
      hospitalId: HOSPITAL_ID,
      required: '×',
      reservable: '不明',
      remark: 'afterRemark',
    };
    await client.query(QUERY, {
      variables,
    });

    const hospitalReservationStatus =
      await db.hospitalReservationStatus.findUniqueOrThrow({
        where: { hospital_id: HOSPITAL_ID },
      });

    expect(hospitalReservationStatus.required).toEqual(variables.required);
    expect(hospitalReservationStatus.reservable).toEqual(variables.reservable);
    expect(hospitalReservationStatus.remark).toEqual(variables.remark);
  });
});
