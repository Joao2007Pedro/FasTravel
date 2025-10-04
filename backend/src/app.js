const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const app = express();
const db = require('./models');
const cors = require("cors");
const helmet = require("helmet");

// Middlewares globais
app.use(express.json());
app.use(helmet());

app.use(cors({
  origin: 'http://localhost:3000', // ajuste se o front estiver em outra porta
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rotas
app.use('/users', require('./routers/userRoutes'));
app.use('/flights', require('./routers/flightRoutes'));
app.use('/bookings', require('./routers/bookingRoutes'));
app.use('/auth', require('./routers/authRoutes'));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
