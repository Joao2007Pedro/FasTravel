const Joi = require("joi");

exports.registerSchema = Joi.object({
  nome: Joi.string().min(3).max(50).required().messages({
    "string.empty": "O nome é obrigatório",
    "string.min": "O nome deve ter pelo menos 3 caracteres",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "E-mail inválido",
    "string.empty": "O e-mail é obrigatório",
  }),
  senha: Joi.string().min(6).required().messages({
    "string.min": "A senha deve ter pelo menos 6 caracteres",
  }),
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
});
