import express from 'express';
import ProductManager from './src/ProductManager.js';

const app = express();
const port = 8080;

const productManager = new ProductManager();

app.use(express.json());

app.get('/products', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const products = productManager.getProducts(limit);
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  const product = productManager.getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'El producto no existe' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
