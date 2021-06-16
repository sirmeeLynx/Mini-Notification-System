/*
 *  Entry point for all api endpoints
 *
 *
 */

import { Application } from 'express';
import validateMessage from './middleware';

export default ({ expressApp }: { expressApp: Application }) => {
  expressApp.use('/:subscriber', validateMessage, (req, res) => {
    const message  = req.body
    const { subscriber } = req.params;
    
    console.log(`message received from ${subscriber} => `, message);

    res.status(200).send({ message: "message sent!"});
  });

  return expressApp;
};
