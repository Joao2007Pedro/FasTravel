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

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rotas
app.use("/users", require("./routers/userRoutes"));
app.use("/flights", require("./routers/flightRoutes"));
app.use("/bookings", require("./routers/bookingRoutes"));
app.use("/auth", require("./routers/authRoutes"));

// Iniciar servidor
const PORT = process.env.PORT || 3000;

db.sequelize
  .authenticate()
  .then(async () => {
    // Em dev, manter sync; em prod, prefira migrations
    if (process.env.NODE_ENV !== "production") {
      await db.sequelize.sync();
    }
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Falha ao conectar no banco:", err.message);
    process.exit(1);
  });
