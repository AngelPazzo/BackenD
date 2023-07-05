import fs from 'fs';

class ProductManager {
  constructor() {
    this.filePath = './src/productos.json';
    this.products = this.loadProductsFromFile();
  }

  loadProductsFromFile() {
    try {
      const fileData = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(fileData);
    } catch (error) {
      console.error(`Error al cargar el archivo: ${error}`);
      return [];
    }
  }

  getProducts(limit) {
    if (limit) {
      return this.products.slice(0, limit);
    } else {
      return this.products;
    }
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }
}

export default ProductManager;

