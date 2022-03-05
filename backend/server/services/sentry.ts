import * as Sentry from '@sentry/node';
import { isProduction } from './environments';

const SENTRY_DSN = process.env['SENTRY_DSN'];

export const initSentry = () => {
  if (!!SENTRY_DSN && isProduction) {
    Sentry.init({
      dsn: SENTRY_DSN,
    });
    console.log('sentry is started');
  } else {
    console.log('sentry is not initialized');
  }
};
