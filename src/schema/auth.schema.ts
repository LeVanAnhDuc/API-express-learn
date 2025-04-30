// libs
import joi from 'joi';
// schemas
import common from './common.schema';

const { emailSchema, passwordSchema } = common;

const MESSAGE_EMPTY = '{{#label}} is not allowed to be empty';
const MESSAGE_EMAIL_INVALID = '{{#label}} is invalid';

const loginSchema = joi.object({
  email: emailSchema.required().messages({
    'string.empty': MESSAGE_EMPTY,
    'string.email': MESSAGE_EMAIL_INVALID,
  }),
  password: joi.string().required().messages({
    'string.empty': MESSAGE_EMPTY,
  }),
});

const signupSchema = joi.object({
  fullName: joi.string().required().messages({
    'string.empty': MESSAGE_EMPTY,
  }),
  email: emailSchema.required().messages({
    'string.empty': MESSAGE_EMPTY,
    'string.email': MESSAGE_EMAIL_INVALID,
  }),
  phone: joi.string().required().messages({
    'string.empty': MESSAGE_EMPTY,
  }),
  password: passwordSchema.required().messages({
    'string.empty': MESSAGE_EMPTY,
  }),
});

const signupVerifySchema = joi.object({
  email: emailSchema.required().messages({
    'string.empty': MESSAGE_EMPTY,
    'string.email': MESSAGE_EMAIL_INVALID,
  }),
  otpCode: joi.string().required().messages({
    'string.empty': MESSAGE_EMPTY,
  }),
});

const reSendOtpSchema = joi.object({
  email: emailSchema.required().messages({
    'string.empty': MESSAGE_EMPTY,
    'string.email': MESSAGE_EMAIL_INVALID,
  }),
});

export { loginSchema, signupSchema, signupVerifySchema, reSendOtpSchema };
