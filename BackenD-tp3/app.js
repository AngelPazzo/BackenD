import express from 'express';
import ProductManager from './src/ProductManager.js';

const app = express();
const productManager = new ProductManager('./src/productos.json');

app.get("/products", (req, res) => {
  try {
    const { limit } = req.query;
    const products = productManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit));
      if (limitedProducts.length === 0) {
        return res.status(404).json({ error: "No se encontraron productos" });
      }
      return res.status(200).json(limitedProducts);
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/products/:id", (req, res) => {
  try {
    const { id } = req.params;
    const product = productManager.getProductById(parseInt(id));

    if (product) {
      return res.status(200).json(product);
    }

    res.status(404).json({ error: "No se encontró el producto con el ID especificado" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});
