import * as joi from 'joi';

const loginSchema = joi.object().keys({
  email: joi.string().email().required()
    .messages({
      'string.empty': 'All fields must be filled',
      'string.email': 'Incorrect email or password',
    }),
  password: joi.string().min(6).required()
    .messages({
      'string.empty': 'All fields must be filled',
      'string.min': 'Incorect email or password',
    }),
});

export default loginSchema;
