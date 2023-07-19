import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import expressWs from 'express-ws';
import expressHandlebars from 'express-handlebars';
import fs from 'fs';
import { Server } from 'socket.io';
import productRoutes from './routes/productsRoutes.js';
import cartRoutes from './routes/cartsRoutes.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const viewsPath = path.join(new URL('.', import.meta.url).pathname, 'views');
const publicPath = path.join(new URL('.', import.meta.url).pathname, 'public');  

const hbs = expressHandlebars.create({
  extname: '.handlebars',
  defaultLayout: 'main',
  layoutsDir: path.join(viewsPath, 'layouts'),
  partialsDir: path.join(viewsPath, 'partials'),
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', viewsPath);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  fs.readFile(path.join(viewsPath, 'products.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo products.json:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    const products = JSON.parse(data);

    res.render('home', { products });
  });
});

app.get('/realtimeproducts', (req, res) => {
  fs.readFile(path.join(viewsPath, 'products.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo products.json:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    const products = JSON.parse(data);

    res.render('realTimeProducts', { products });
  });
});

// Ruta para agregar un nuevo producto mediante petición POST
app.post('/api/products', (req, res) => {
  // ... Lógica para agregar un nuevo producto ...

  // Después de agregar el producto, emite el evento 'new-product' con los datos del producto
  const newProduct = { /* Datos del nuevo producto */ };
  io.emit('new-product', newProduct);

  // Envía una respuesta a la petición HTTP
  res.status(201).json({ message: 'Producto agregado exitosamente' });
});

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Servidor HTTP y de sockets iniciado en http://localhost:${port}`);
});
