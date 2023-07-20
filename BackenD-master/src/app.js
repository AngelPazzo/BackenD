import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { Server } from 'socket.io';
import expressHandlebars from 'express-handlebars';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Obtenemos la ruta de la carpeta actual 
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Configurar Handlebars como motor de plantillas
const hbs = expressHandlebars.create({
  extname: '.handlebars',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Carpeta para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página de inicio

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, 'productos.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo productos.json:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    const products = JSON.parse(data);
    res.render('home', { products });
  });
});

// Ruta para la vista con websockets
app.get('/realtimeproducts', (req, res) => {
  fs.readFile(path.join(__dirname, 'productos.json'), 'utf-8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo productos.json:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    const products = JSON.parse(data);
    res.render('realTimeProducts', { products });
  });
});

// Configurar websockets
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Escuchar el evento para agregar un nuevo producto
  socket.on('new-product', (productName) => {
    console.log(`Nuevo producto: ${productName}`);

    // agrega el producto a la lista de productos
    io.emit('update-products', products);
  });

  // eliminar producto
  socket.on('delete-product', (productName) => {
    console.log(`Producto eliminado: ${productName}`);

    // elimina el producto de la lista de productos
    io.emit('update-products', products);
  });

  // actualizar producto
  socket.on('update-product', (productName) => {
    console.log(`Producto actualizado: ${productName}`);

    // actualiza el producto de la lista de productos
    io.emit('update-products', products);
  });

  // cuando el cliente se conecta
  socket.on('connect', () => {
    console.log('Cliente conectado');
  });


  // Cuando un cliente se desconecta
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Servidor HTTP y de sockets iniciado en http://localhost:${port}`);
});








