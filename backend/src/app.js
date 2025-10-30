const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const db = require("./models");

// Middlewares globais
app.use(express.json());
app.use(helmet());

// CORS: permite configurar múltiplas origens via env (separadas por vírgula)
const corsOrigin = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim());
app.use(
  cors({
    origin: corsOrigin,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rotas
app.use("/users", require("./routers/userRoutes"));
app.use("/flights", require("./routers/flightRoutes"));
app.use("/bookings", require("./routers/bookingRoutes"));
app.use("/auth", require("./routers/authRoutes"));

// Iniciar servidor
const PORT = process.env.PORT || 3001;

db.sequelize
  .authenticate()
  .then(async () => {
    // Em dev, manter sync; em prod, prefira migrations
    if (process.env.NODE_ENV !== "production") {
      await db.sequelize.sync({ alter: true });
    }
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Falha ao conectar no banco:", err.message);
    process.exit(1);
  });
