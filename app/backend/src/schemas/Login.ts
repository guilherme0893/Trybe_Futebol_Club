import * as joi from 'joi';

class LoginSchema {
  login = joi.object().keys({
    email: joi.string().email().empty().required()
      .messages({
        'string.empty': 'All fields must be filled',
      }),
    password: joi.string().min(6).empty().required()
      .messages({
        'string.empty': 'All fields must be filled',
      }),
  });
}

export default LoginSchema;
