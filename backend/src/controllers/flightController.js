const db = require('../models');

module.exports = {
  async createFlight(req, res) {
    try {
      const { origem, destino, partida, chegada, preco } = req.body;
      const flight = await db.Flight.create({ origem, destino, partida, chegada, preco });
      return res.status(201).json(flight);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getFlights(req, res) {
    try {
      const flights = await db.Flight.findAll();
      return res.json(flights);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
