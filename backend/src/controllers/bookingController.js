// backend/src/controllers/bookingController.js
const { Booking, Flight, User } = require("../models");
const { bookingSchema, bookingStatusSchema } = require("../validations/bookingValidation");

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
      status: 'pending',
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
    if (booking.userId !== req.user.id) {
      return res.status(403).json({ error: "Acesso não autorizado a esta reserva" });
    }
    return res.json(booking);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Atualizar status da reserva (ex.: pending -> paid, canceled)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = bookingStatusSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const booking = await Booking.findByPk(id);
    if (!booking) return res.status(404).json({ error: "Reserva não encontrada" });
    if (booking.userId !== req.user.id) {
      return res.status(403).json({ error: "Acesso não autorizado a esta reserva" });
    }

    booking.status = req.body.status;
    await booking.save();
    return res.json(booking);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Cancelar reserva (remoção)
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (!booking) return res.status(404).json({ error: "Reserva não encontrada" });
    if (booking.userId !== req.user.id) {
      return res.status(403).json({ error: "Acesso não autorizado a esta reserva" });
    }
    await booking.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Simular processamento de pagamento e confirmar a reserva
exports.processPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ error: "Reserva não encontrada" });
    }

    // Apenas o usuário que criou a reserva pode pagar
    if (booking.userId !== req.user.id) {
      return res.status(403).json({ error: "Acesso não autorizado a esta reserva" });
    }

    // Simulação de uma chamada a um gateway de pagamento
    // Em um cenário real, aqui você integraria com Stripe, PayPal, etc.
    const pagamentoAprovado = await simularGatewayPagamento();

    if (pagamentoAprovado) {
      booking.status = 'confirmed';
      await booking.save();
      res.json({ message: "Pagamento bem-sucedido e reserva confirmada", booking });
    } else {
      booking.status = 'failed';
      await booking.save();
      res.status(400).json({ error: "Pagamento falhou" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função auxiliar para simular a resposta de um gateway de pagamento
const simularGatewayPagamento = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      // Simula sucesso em 90% dos casos
      const sucesso = Math.random() < 0.9;
      resolve(sucesso);
    }, 2000); // Simula 2 segundos de processamento
  });
};
