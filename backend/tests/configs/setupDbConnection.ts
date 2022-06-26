import { client } from '@/services/prisma';
import { executeTest } from '../../prisma/seeds/test';

const setup = async () => {
  const tableNames = (
    (await client.$queryRawUnsafe(
      `SELECT tablename FROM pg_catalog.pg_tables WHERE hastriggers = true;`
    )) as { tablename: string }[]
  ).map(({ tablename }) => tablename);

  await client.$transaction(
    tableNames.map((tableName) =>
      client.$queryRawUnsafe(
        `TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE;`
      )
    )
  );
  return executeTest();
};

beforeEach(async () => {
  await setup();
});
