import fs from 'fs';
import path from 'path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

class ProductManager {
  constructor() {
    this.products = [];
    this.loadProductsFromFile();
  }

  loadProductsFromFile() {
    fs.readFile(path.join(__dirname, 'productos.json'), 'utf-8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo productos.json:', err);
        return;
      }

      this.products = JSON.parse(data);
    });
  }

  saveProductsToFile() {
    fs.writeFile(path.join(__dirname, 'productos.json'), JSON.stringify(this.products, null, 2), (err) => {
      if (err) {
        console.error('Error al escribir el archivo productos.json:', err);
      }
    });
  }

  getProducts(limit) {
    if (limit) {
      return this.products.slice(0, limit);
    } else {
      return this.products;
    }
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  addProduct(product) {
    this.products.push(product);
    this.saveProductsToFile();
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.saveProductsToFile();
      return true;
    } else {
      return false;
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProductsToFile();
      return true;
    } else {
      return false;
    }
  }
}

export default ProductManager;