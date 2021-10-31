import { app } from './app';

const PORT = process.env['PORT'] || 3000;

const start = async () => {
  try {
    await app.listen(PORT, '0.0.0.0');
    app.cron.startAllJobs();
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
