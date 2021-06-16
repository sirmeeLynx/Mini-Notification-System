import { RequestHandler } from 'express';
import  Joi  from 'joi';

const validateRequest = (headerSchema: Joi.ObjectSchema, bodySchema: Joi.ObjectSchema) => {
    const fnHandler: RequestHandler = async (req, res, next) => {
        const responseObj = {
            prettyMessage: 'Bad Request',
            status: 400,
            success: false,
          };

        try {
          const { body, headers } = req;
          await headerSchema.validateAsync(headers);
          await bodySchema.validateAsync(body);
          next();
        } catch (err) {
          responseObj.prettyMessage += err.message;
          res.status(responseObj.status);
          res.json(responseObj);
        }
      };

      return fnHandler;
}

export default validateRequest;