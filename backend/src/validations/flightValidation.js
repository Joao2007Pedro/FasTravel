// backend/src/validations/flightValidation.js
const Joi = require("joi");

exports.flightSchema = Joi.object({
  origem: Joi.string().min(2).max(50).required().messages({
    "string.empty": 'Campo "origem" é obrigatório',
  }),
  destino: Joi.string().min(2).max(50).required().messages({
    "string.empty": 'Campo "destino" é obrigatório',
  }),
  partida: Joi.date().required().messages({
    "date.base": "Data/hora de partida inválida",
  }),
  chegada: Joi.date().required().messages({
    "date.base": "Data/hora de chegada inválida",
  }),
  preco: Joi.number().positive().required().messages({
    "number.base": "Preço deve ser um número",
    "number.positive": "Preço deve ser maior que 0",
  }),
});

// Para atualização, todos os campos são opcionais, mas pelo menos um deve ser enviado
exports.flightUpdateSchema = Joi.object({
  origem: Joi.string().min(2).max(50),
  destino: Joi.string().min(2).max(50),
  partida: Joi.date().messages({
    "date.base": "Data/hora de partida inválida",
  }),
  chegada: Joi.date().messages({
    "date.base": "Data/hora de chegada inválida",
  }),
  preco: Joi.number().positive().messages({
    "number.base": "Preço deve ser um número",
    "number.positive": "Preço deve ser maior que 0",
  }),
}).min(1);
