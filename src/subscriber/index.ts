import expressLoader from './../loaders/expressLoader';

import express from 'express';
import morgan from 'morgan';

import config from '../config';
import initRoutes from './api';

 const server = async () => {
  const app = express();
  app.use(morgan('dev'));

  await expressLoader({ app });
  console.log('Express Initialised.');
  initRoutes({ expressApp: app }); // initialise all endpoints

  app.listen(config.SUBSCRIBER_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started at http://localhost:${config.SUBSCRIBER_PORT}`);
  });
};

export default server;
