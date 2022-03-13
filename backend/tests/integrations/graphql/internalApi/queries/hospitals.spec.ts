import gql from 'graphql-tag';
import { client as db } from '@/services/prisma';
import { setup } from '@tests/utils/setupInternalApi';

const QUERY = gql`
  query {
    hospitals {
      id
      name
      url
      deleted
      internal_memo
    }
  }
`;

const HOSPITAL_NAME_1 = 'name1';
const HOSPITAL_URL_1 = 'https://test.com1';
const HOSPITAL_INTERNAL_MEMO_1 = 'internalMemo1';
const HOSPITAL_DELETED_1 = false;
const HOSPITAL_NAME_2 = 'name2';
const HOSPITAL_URL_2 = 'https://test.com2';
const HOSPITAL_INTERNAL_MEMO_2 = 'internalMemo2';
const HOSPITAL_DELETED_2 = true;

const init = async () => {
  return db.hospital.createMany({
    data: [
      {
        name: HOSPITAL_NAME_1,
        url: HOSPITAL_URL_1,
        internal_memo: HOSPITAL_INTERNAL_MEMO_1,
        deleted: HOSPITAL_DELETED_1,
      },
      {
        name: HOSPITAL_NAME_2,
        url: HOSPITAL_URL_2,
        internal_memo: HOSPITAL_INTERNAL_MEMO_2,
        deleted: HOSPITAL_DELETED_2,
      },
    ],
  });
};

describe('hospitals', () => {
  beforeEach(() => {
    return init();
  });

  it('returns all hospitals', async () => {
    const client = await setup();

    const result = await client.query(QUERY);

    const hospitals = result.data['hospitals'];
    expect(hospitals.length).toEqual(2);

    const hospital1 = hospitals[0];
    expect(hospital1.name).toEqual(HOSPITAL_NAME_1);
    expect(hospital1.url).toEqual(HOSPITAL_URL_1);
    expect(hospital1.internal_memo).toEqual(HOSPITAL_INTERNAL_MEMO_1);
    expect(hospital1.deleted).toEqual(HOSPITAL_DELETED_1);

    const hospital2 = hospitals[1];
    expect(hospital2.name).toEqual(HOSPITAL_NAME_2);
    expect(hospital2.url).toEqual(HOSPITAL_URL_2);
    expect(hospital2.internal_memo).toEqual(HOSPITAL_INTERNAL_MEMO_2);
    expect(hospital2.deleted).toEqual(HOSPITAL_DELETED_2);
  });
});
