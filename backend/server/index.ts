import { app } from './app';
import { stockExpirationAlertJob, geoLocationAlertJob } from '@/services/jobs';

const PORT = Number(process.env['PORT']) || 3000;

const start = async () => {
  try {
    await app.listen({ port: PORT });
    console.log(`server start listening in port:${PORT}`);

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
