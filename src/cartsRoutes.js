import express from 'express';
import CartManager from './CartManager.js';

const router = express.Router();
const cartManager = new CartManager();

router.get('/', (req, res) => {
  const carts = cartManager.getCarts();
  res.json(carts);
});

router.get('/:cid', (req, res) => {
  const cid = req.params.cid;
  const cart = cartManager.getCartById(cid);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ error: 'El carrito no existe' });
  }
});

router.post('/', (req, res) => {
  const cart = cartManager.createCart();
  res.status(201).json(cart);
});

router.post('/:cid/product/:pid', (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = 1;

  const cart = cartManager.getCartById(cid);
  if (cart) {
    const existingProduct = cart.products.find((product) => product.product === pid);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }
    cartManager.saveCartsToFile();
    res.status(201).json(cart.products);
  } else {
    res.status(404).json({ error: 'El carrito no existe' });
  }
});

export default router;
