import { PrismaPromise, Prisma } from '@prisma/client';
import { client } from '@/services/prisma';
import { executeTest } from '../../prisma/seeds/test';

const truncateTransactions: PrismaPromise<any>[] = [];

const pushTruncateTransactionIfNeeded = () => {
  if (truncateTransactions.length === 0) {
    truncateTransactions.push(client.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`);

    const tablenames = Prisma.dmmf.datamodel.models.map(
      (model) => model.dbName
    );

    for (const tablename of tablenames) {
      if (tablename !== '_prisma_migrations' && tablename !== null) {
        try {
          truncateTransactions.push(
            client.$executeRawUnsafe(`TRUNCATE ${tablename};`)
          );
        } catch (error) {
          console.log({ error });
        }
      }
    }

    truncateTransactions.push(client.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`);
  }
};

const setup = async () => {
  pushTruncateTransactionIfNeeded();
  await client.$transaction(truncateTransactions);
  return executeTest();
};

beforeEach(() => {
  return setup();
});
