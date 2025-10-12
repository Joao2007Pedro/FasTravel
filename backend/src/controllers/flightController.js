// backend/src/controllers/flightController.js
const { Flight } = require("../models");
const { Op } = require("sequelize");
const {
  flightSchema,
  flightUpdateSchema,
} = require("../validations/flightValidation");

// Criar voo
exports.createFlight = async (req, res) => {
  try {
    const { error } = flightSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const flight = await Flight.create(req.body);
    res.status(201).json(flight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar voos com filtros simples (origem, destino, data)
exports.getFlights = async (req, res) => {
  try {
    const { origem, destino, data } = req.query;

    const where = {};
    if (origem) where.origem = { [Op.like]: `%${origem}%` };
    if (destino) where.destino = { [Op.like]: `%${destino}%` };
    if (data) {
      // filtra por data (mesmo dia) com base no campo partida
      const start = new Date(data);
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      where.partida = { [Op.gte]: start, [Op.lt]: end };
    }

    const flights = await Flight.findAll({
      where,
      order: [["partida", "ASC"]],
    });
    res.json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar voo por ID
exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findByPk(req.params.id);
    if (!flight) return res.status(404).json({ message: "Voo não encontrado" });
    res.json(flight);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Atualizar voo
exports.updateFlight = async (req, res) => {
  try {
    const { error } = flightUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const flight = await Flight.findByPk(req.params.id);
    if (!flight) return res.status(404).json({ error: "Voo não encontrado" });

    await flight.update(req.body);
    return res.json(flight);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Excluir voo
exports.deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByPk(req.params.id);
    if (!flight) return res.status(404).json({ error: "Voo não encontrado" });
    await flight.destroy();
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
