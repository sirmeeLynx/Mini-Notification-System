import { RequestHandler } from 'express';
import Joi from 'joi';
import validateRequest from '../../../helpers/validateRequest';

const schema = Joi.object({ a: Joi.any() }).unknown().min(1);

const headerSchema = Joi.object({
  'content-type': Joi.equal('application/json').required(),
}).unknown(true);

const publishValidate: RequestHandler = validateRequest(headerSchema, schema);

export default publishValidate;
