// backend/src/controllers/bookingController.js
const { Booking, Flight, User } = require("../models");
const { bookingSchema } = require("../validations/bookingValidation");

// Criar reserva
exports.createBooking = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Não autenticado" });
    }
    const { error } = bookingSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { flightId, quantidade, precoTotal } = req.body;
    const booking = await Booking.create({
      flightId,
      userId: req.user.id, // vem do token
      quantidade,
      precoTotal,
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Listar reservas com paginação
exports.getBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const bookings = await Booking.findAndCountAll({
      where: { userId: req.user.id },
      include: [
        { model: Flight, as: "flight" },
        { model: User, as: "user", attributes: ["id", "nome", "email"] },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    res.json({
      total: bookings.count,
      page: parseInt(page),
      totalPages: Math.ceil(bookings.count / limit),
      data: bookings.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar uma reserva por ID
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id, { include: ["user", "flight"] });
    if (!booking)
      return res.status(404).json({ error: "Reserva não encontrada" });
    return res.json(booking);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
