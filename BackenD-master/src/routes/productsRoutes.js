import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import ProductManager from '../ProductManager.js';

const router = express.Router();
const productManager = new ProductManager();

router.get('/', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const products = productManager.getProducts(limit);
  res.json(products);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const product = productManager.getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'El producto no existe' });
  }
});

router.post('/', (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  const product = {
    id: uuidv4(), 
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  };
  productManager.addProduct(product);
  
  const responseProduct = { ...product };
  delete responseProduct.id;
  res.status(201).json(responseProduct);
}

);

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  const updatedProduct = {
    id,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  };
  const result = productManager.updateProduct(id, updatedProduct);
  if (result) {
    res.json(updatedProduct);
  } else {
    res.status(404).json({ error: 'El producto no existe' });
  }
}

);

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const result = productManager.deleteProduct(id);
  if (result) {
    res.json({ message: 'Producto eliminado' });
  } else {
    res.status(404).json({ error: 'El producto no existe' });
  }
}

);

export default router;