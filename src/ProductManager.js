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
      console.error(`Error al cargar el archivo de productos: ${error}`);
      return [];
    }
  }

  saveProductsToFile() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2));
      console.log('Productos guardados exitosamente.');
    } catch (error) {
      console.error(`Error al guardar el archivo de productos: ${error}`);
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
    return this.products.find((product) => product.id === id);
  }

  addProduct(product) {
    this.products.push(product);
    this.saveProductsToFile();
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      this.saveProductsToFile();
      return true;
    }
    return false;
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProductsToFile();
      return true;
    }
    return false;
  }

  

  
}

export default ProductManager;
