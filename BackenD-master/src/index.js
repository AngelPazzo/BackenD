import express from 'express';
import cors from 'cors';
import productsRoutes from './routes/productsRoutes.js';
import cartsRoutes from './routes/cartsRoutes.js';

const app = express();
const port = 8080;


app.use(express.json());
app.use(cors());


app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);


app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});