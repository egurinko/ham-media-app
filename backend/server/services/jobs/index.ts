import { createGeoLocationJob } from './createGeoLocations';
import { createStockExpirationAlert } from './createStockExpirationAlert';

export const jobs = [createGeoLocationJob, createStockExpirationAlert];
