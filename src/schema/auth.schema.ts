// libs
import joi from 'joi';
// schemas
import common from './common.schema';

const { emailSchema, passwordSchema } = common;

const loginSchema = joi.object({
  email: emailSchema.required().messages({
    'string.empty': '{{#label}} is not allowed to be empty',
    'string.email': '{{#label}} must be a valid email',
  }),
  password: joi.string().required().messages({
    'string.empty': '{{#label}} is not allowed to be empty',
  }),
});

const signupSchema = joi.object({
  fullName: joi.string().required().messages({
    'string.empty': '{{#label}} is not allowed to be empty',
  }),
  email: emailSchema.required().messages({
    'string.empty': '{{#label}} is not allowed to be empty',
    'string.email': '{{#label}} must be a valid email',
  }),
  phone: joi.string().required().messages({
    'string.empty': '{{#label}} is not allowed to be empty',
  }),
  password: passwordSchema.required().messages({
    'string.empty': '{{#label}} is not allowed to be empty',
  }),
});

export { loginSchema, signupSchema };
