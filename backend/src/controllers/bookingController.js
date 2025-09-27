const db = require('../models');

module.exports = {
  async createBooking(req, res) {
    try {
      const { userId, flightId, quantidade, precoTotal } = req.body;
      const booking = await db.Booking.create({ userId, flightId, quantidade, precoTotal });
      return res.status(201).json(booking);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getBookings(req, res) {
    try {
      const bookings = await db.Booking.findAll({ include: ['user', 'flight'] });
      return res.json(bookings);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
