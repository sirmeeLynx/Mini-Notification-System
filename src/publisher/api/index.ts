/*
 *  Entry point for all api endpoints
 *
 *
 */

import { Application } from 'express';

import { Subscribe, Publish } from './routes';

export default ({ expressApp }: { expressApp: Application }) => {
  expressApp.use('/subscribe', Subscribe);
  expressApp.use('/publish', Publish);
  
  expressApp.use('/', (_, res) => {
    const noRoute = {
      status: 400,
      prettyMessage: 'Invalid Route.',
      success: false,
    };

    res.status(noRoute.status);
    res.send(noRoute);
  });
};
