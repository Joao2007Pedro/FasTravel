// backend/src/routers/flightRoutes.js
const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");
const authMiddleware = require("../middlewares/auth");

// Criar voo
router.post("/", authMiddleware, flightController.createFlight);

// Listar voos com filtros e paginação
router.get("/", flightController.getFlights);

// Buscar voo por ID
router.get("/:id", flightController.getFlightById);

// Atualizar e excluir voo (admin)
router.put("/:id", authMiddleware, flightController.updateFlight);
router.delete("/:id", authMiddleware, flightController.deleteFlight);

module.exports = router;
