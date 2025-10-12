// backend/src/validations/bookingValidation.js
const Joi = require("joi");

exports.bookingSchema = Joi.object({
  flightId: Joi.number().integer().required().messages({
    "number.base": "ID do voo deve ser um número",
    "any.required": 'O campo "flightId" é obrigatório',
  }),
  quantidade: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantidade deve ser um número inteiro",
    "number.min": "Quantidade deve ser no mínimo 1",
    "any.required": 'O campo "quantidade" é obrigatório',
  }),
  precoTotal: Joi.number().positive().required().messages({
    "number.base": "Preço total deve ser um número",
    "number.positive": "Preço total deve ser maior que 0",
    "any.required": 'O campo "precoTotal" é obrigatório',
  }),
}).unknown(false);
