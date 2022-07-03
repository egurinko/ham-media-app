import { app } from './app';

const PORT = Number(process.env['PORT']) || 3000;

const start = async () => {
  try {
    await app.listen({ port: PORT });
    console.log(`server start listening in port:${PORT}`);

    app.cron.startAllJobs();
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
