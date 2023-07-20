import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

class CartManager {
  constructor() {
    this.carts = [];
    this.loadCartsFromFile();
  }

  loadCartsFromFile() {
    fs.readFile(path.join(__dirname, 'carritos.json'), 'utf-8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo carritos.json:', err);
        return;
      }

      this.carts = JSON.parse(data);
    }
    );
  }

  saveCartsToFile() {
    fs.writeFile(path.join(__dirname, 'carritos.json'), JSON.stringify(this.carts, null, 2), (err) => {
      if (err) {
        console.error('Error al escribir el archivo carritos.json:', err);
      }
    }
    );
  }

  getCarts() {
    return this.carts;
  }

  getCartById(id) {
    return this.carts.find((cart) => cart.id === id);
  }

  createCart() {
    const cart = {
      id: uuidv4(),
      timestamp: Date.now(),
      products: []
    };
    this.carts.push(cart);
    this.saveCartsToFile();
    return cart;
  }
}

export default CartManager;