import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development')
    .required(),
  PORT: Joi.number().required(),
  IP_STACK_API_KEY: Joi.string().required(),
  WEATHER_API_KEY: Joi.string().required(),
});
