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

  addProductToCart(cartId, productId, quantity) {
    const cart = this.getCartById(cartId);
    if (cart) {
      const existingProduct = cart.products.find((product) => product.product === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
      this.saveCartsToFile();
      return cart.products;
    } else {
      throw new Error('El carrito no existe');
    }
  }

  
}

export default CartManager;
