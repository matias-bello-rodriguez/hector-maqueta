const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const clientesRoutes = require('./routes/clientesRoutes');
const cotizacionesRoutes = require('./routes/cotizacionesRoutes');
const ventasRoutes = require('./routes/ventasRoutes');
const authRoutes = require('./routes/authRoutes');
const eventosRoutes = require('./routes/eventosRoutes');

app.use('/api/clientes', clientesRoutes);
app.use('/api/cotizaciones', cotizacionesRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/eventos', eventosRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('API Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
