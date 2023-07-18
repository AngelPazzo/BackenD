import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productRoutes from './routes/productsRoutes.js';
import cartRoutes from './routes/cartsRoutes.js';

const app = express();


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);


const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
