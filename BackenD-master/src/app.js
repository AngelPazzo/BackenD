import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { Server } from 'socket.io';
import expressHandlebars from 'express-handlebars';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hbs = expressHandlebars.create({
  extname: '.handlebars',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, 'productos.json'), 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error interno del servidor' });
    const products = JSON.parse(data);
    res.render('home', { products });
  });
});

app.get('/realtimeproducts', (req, res) => {
  fs.readFile(path.join(__dirname, 'productos.json'), 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error interno del servidor' });
    const products = JSON.parse(data);
    res.render('realTimeProducts', { products });
  });
});

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('new-product', (productName) => {
    console.log(`Nuevo producto: ${productName}`);

    app.post('/add-product', (req, res) => {
      const { title, description, code, price, status, stock, category } = req.body;
      fs.readFile(path.join(__dirname, 'productos.json'), 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Error interno del servidor' });

        const products = JSON.parse(data);
        const newProductId = uuidv4();
        const newProduct = {
          id: newProductId,
          title,
          description,
          code,
          price,
          status,
          stock,
          category,
          thumbnails: [],
        };

        products.push(newProduct);

        fs.writeFile(
          path.join(__dirname, 'productos.json'),
          JSON.stringify(products, null, 2),
          'utf-8',
          (err) => {
            if (err) return res.status(500).json({ error: 'Error interno del servidor' });
            res.redirect('/');
          }
        );
      });
    });

    io.emit('update-products', products);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Servidor HTTP y de sockets iniciado en http://localhost:${port}`);
});















