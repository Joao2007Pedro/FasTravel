// backend/src/routers/bookingRoutes.js
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middlewares/auth");

router.post("/", authMiddleware, bookingController.createBooking);
router.get("/", authMiddleware, bookingController.getBookings);
router.get("/:id", authMiddleware, bookingController.getBookingById);
router.patch(
	"/:id/status",
	authMiddleware,
	bookingController.updateBookingStatus
);
router.delete(
	"/:id",
	authMiddleware,
	bookingController.deleteBooking
);
router.post("/:id/payment", authMiddleware, bookingController.processPayment);

module.exports = router;
