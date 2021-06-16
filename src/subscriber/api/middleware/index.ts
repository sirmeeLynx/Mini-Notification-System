import { RequestHandler } from 'express';
import Joi from 'joi';
import validateRequest from '../../../helpers/validateRequest';

const schema = Joi.object({
  topic: Joi.string().required(),
  data: Joi.object().required()
});

const headerSchema = Joi.object({
  'content-type': Joi.equal('application/json').required(),
}).unknown(true);

const validateMessage: RequestHandler = validateRequest(headerSchema, schema);

export default validateMessage;
