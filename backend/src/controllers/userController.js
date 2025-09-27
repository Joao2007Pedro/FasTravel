const db = require('../models');

module.exports = {
  async createUser(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const user = await db.User.create({ nome, email, senha });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getUsers(req, res) {
    try {
      const users = await db.User.findAll({ include: 'bookings' });
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
