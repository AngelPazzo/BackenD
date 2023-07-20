import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { Server } from 'socket.io';
import expressHandlebars from 'express-handlebars';
import { fileURLToPath } from 'url';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Obtenemos la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
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

    // Agrega la lógica para agregar el producto a la lista de productos

    // Después de agregar el producto, emitir el evento a todos los clientes conectados para actualizar la lista
    io.emit('update-products', products);
  });

  // Agrega la lógica para escuchar otros eventos, como eliminar un producto, etc.

  // Cuando un cliente se desconecta
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Servidor HTTP y de sockets iniciado en http://localhost:${port}`);
});


















