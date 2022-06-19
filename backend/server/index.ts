import { app } from './app';
import { stockExpirationAlertJob, geoLocationAlertJob } from '@/services/jobs';

const PORT = process.env['PORT'] || 3000;

const start = async () => {
  try {
    await app.listen(PORT, '0.0.0.0');

    app.ready().then(() => {
      stockExpirationAlertJob.start();
      geoLocationAlertJob.start();
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
