import { executeProduction } from './production';
import { seedInternalUser } from './development/internalUser';
import { seedMaker } from './development/maker';
import { seedProductTagGroup } from './development/productTagGroup';
import { seedProductTag } from './development/productTag';
import { seedProduct } from './development/product';
import { seedProductTagging } from './development/productTagging';
import { seedStock } from './development/stock';
import { seedStockRequest } from './development/stockRequest';

export const executeDevelopment = async () => {
  try {
    await executeProduction();

    await seedInternalUser();

    await seedMaker();
    await seedProductTagGroup();
    await seedProductTag();

    await seedProduct();
    await seedProductTagging();
    await seedStock();
    await seedStockRequest();

    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};
