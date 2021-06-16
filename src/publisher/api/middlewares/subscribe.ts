import { RequestHandler } from 'express';
import Joi from 'joi';
import validateRequest from '../../../helpers/validateRequest';

const schema = Joi.object({
  url: Joi.string().uri().required()
});

const headerSchema = Joi.object({
  'content-type': Joi.equal('application/json').required(),
}).unknown(true);

const subscribeValidate: RequestHandler = validateRequest(headerSchema, schema);

export default subscribeValidate;
