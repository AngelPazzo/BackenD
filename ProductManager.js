const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = this.loadProductsFromFile();
    this.nextId = this.calculateNextId();
  }

  loadProductsFromFile() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
      return [];
    }
  }

  saveProductsToFile() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2));
      console.log('Archivo guardado exitosamente.');
    } catch (error) {
      console.error('Error al guardar el archivo:', error);
    }
  }

  calculateNextId() {
    const maxId = this.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
    return maxId + 1;
  }

  addProduct(product) {
    const newProduct = { ...product, id: this.nextId++ };
    this.products.push(newProduct);
    this.saveProductsToFile();
    console.log('Producto agregado exitosamente.');
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

updateProduct(id, updatedProduct) {
    const product = this.getProductById(id);
    if (product) {
      Object.assign(product, { id, ...updatedProduct });
      this.saveProductsToFile();
      console.log('Producto actualizado exitosamente.');
    } else {
      console.log('No se encontró el producto con el ID especificado.');
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProductsToFile();
      console.log('Producto eliminado exitosamente.');
    } else {
      console.log('No se encontró el producto con el ID especificado.');
    }
  }
}

const productManager = new ProductManager('productos.json');

productManager.addProduct({
  title: 'Producto 1',
  description: 'Descripción del producto 1',
  price: 10.99,
  thumbnail: 'imagen1.jpg',
  code: 'P001',
  stock: 10
});

const product = productManager.getProductById(1);
console.log('Producto consultado:', product);

productManager.updateProduct(1, {
  title: 'Producto 1 Modificado',
  description: 'Nueva descripción',
  price: 12.99,
  thumbnail: 'imagen1_modificada.jpg',
  code: 'P001',
  stock: 8
});

productManager.deleteProduct(1);
