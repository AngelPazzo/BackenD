import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productRoutes from './routes/productsRoutes.js';
import cartRoutes from './routes/cartsRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Puerto del servidor
const port = process.env.PORT || 8080;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
