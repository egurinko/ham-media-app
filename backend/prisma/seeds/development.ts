import { executeProduction } from './production';
import { seedInternalUser } from './development/internalUser';
import { seedCart } from './development/cart';
import { seedMaker } from './development/maker';
import { seedProductTagGroup } from './development/productTagGroup';
import { seedProductTag } from './development/productTag';
import { seedProduct } from './development/product';
import { seedProductTagging } from './development/productTagging';
import { seedStock } from './development/stock';
import { seedStockRequest } from './development/stockRequest';

import { seedHospital } from './development/hospital';
import { seedHospitalAddress } from './development/hospital/address';
import { seedHospitalAddressGeoLocation } from './development/hospital/address/geoLocation';
import { seedHospitalBusinessForm } from './development/hospital/businessForm';
import { seedHospitalCertificationOption } from './development/hospital/certificationOption';
import { seedHospitalInternalReputation } from './development/hospital/internalReputation';
import { seedHospitalNightServiceOption } from './development/hospital/nightServiceOption';
import { seedHospitalNightUrgentActionOption } from './development/hospital/nightUrgentActionOption';
import { seedHospitalReservationStatus } from './development/hospital/reservationStatus';

export const executeDevelopment = async () => {
  try {
    await executeProduction();

    await seedInternalUser();
    await seedCart();

    await seedMaker();
    await seedProductTagGroup();
    await seedProductTag();

    await seedProduct();
    await seedProductTagging();
    await seedStock();
    await seedStockRequest();

    await seedHospital();
    await seedHospitalAddress();
    await seedHospitalAddressGeoLocation();
    await seedHospitalBusinessForm();
    await seedHospitalCertificationOption();
    await seedHospitalInternalReputation();
    await seedHospitalNightServiceOption();
    await seedHospitalNightUrgentActionOption();
    await seedHospitalReservationStatus();

    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};
