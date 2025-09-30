require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models');
const userRoutes = require('./routes/userRoutes');



app.use(express.json());

// Rotas
app.use('/users', require('./routers/userRoutes'));
app.use('/flights', require('./routers/flightRoutes'));
app.use('/bookings', require('./routers/bookingRoutes'));
app.use('/auth', require('./routers/authRoutes'));
app.use('/api', userRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
