import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

class CartManager {
  constructor() {
    this.filePath = './src/carrito.json';
    this.carts = this.loadCartsFromFile();
  }

  loadCartsFromFile() {
    try {
      const fileData = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(fileData);
    } catch (error) {
      console.error(`Error al cargar el archivo de carritos: ${error}`);
      return [];
    }
  }

  saveCartsToFile() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.carts, null, 2));
      console.log('Carritos guardados exitosamente.');
    } catch (error) {
      console.error(`Error al guardar el archivo de carritos: ${error}`);
    }
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
      products: []
    };
    this.carts.push(cart);
    this.saveCartsToFile();
    return cart;
  }

  // Resto de los métodos de CartManager

  // ...
}

export default CartManager;
