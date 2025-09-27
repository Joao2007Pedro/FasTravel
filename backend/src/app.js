const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());

// Rotas
app.use('/users', require('./routers/userRoutes'));
app.use('/flights', require('./routers/flightRoutes'));
app.use('/bookings', require('./routers/bookingRoutes'));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
