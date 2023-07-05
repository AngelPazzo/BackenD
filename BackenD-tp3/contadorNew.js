class Producto {
  constructor(title, description, price, thumbnail, codigoIdentificador, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.codigoIdentificador = codigoIdentificador;
    this.stock = stock;
  }
}

class ProductManager {
  constructor() {
    this.productos = [];
  }

  addProduct(title, description, price, thumbnail, codigoIdentificador, stock) {
    const nuevoProducto = new Producto(title, description, price, thumbnail, codigoIdentificador, stock);
    this.productos.push(nuevoProducto);
  }

  listarProductos() {
    for (const producto of this.productos) {
      console.log("Producto:", producto.title);
      console.log("Descripción:", producto.description);
      console.log("Precio:", producto.price);
      console.log("Thumbnail:", producto.thumbnail);
      console.log("Código Identificador:", producto.codigoIdentificador);
      console.log("Stock:", producto.stock);
      console.log("----------------------------------");
    }
  }

  getProduct(index) {
    if (index >= 0 && index < this.productos.length) {
      const producto = this.productos[index];
      console.log("Producto:", producto.title);
      console.log("Descripción:", producto.description);
      console.log("Precio:", producto.price);
      console.log("Thumbnail:", producto.thumbnail);
      console.log("Código Identificador:", producto.codigoIdentificador);
      console.log("Stock:", producto.stock);
    } else {
      console.log("Índice de producto inválido.");
    }
  }

  getProductById(codigoIdentificador) {
    const productoEncontrado = this.productos.find(
      (producto) => producto.codigoIdentificador === codigoIdentificador
    );
    if (productoEncontrado) {
      console.log("Producto encontrado:");
      console.log("Título:", productoEncontrado.title);
      console.log("Descripción:", productoEncontrado.description);
      console.log("Precio:", productoEncontrado.price);
      console.log("Thumbnail:", productoEncontrado.thumbnail);
      console.log("Stock:", productoEncontrado.stock);
    } else {
      console.log("Not Found");
    }
  }

  eliminarProducto(codigoIdentificador) {
    const indiceProducto = this.productos.findIndex(
      (producto) => producto.codigoIdentificador === codigoIdentificador
    );
    if (indiceProducto !== -1) {
      const productoEliminado = this.productos.splice(indiceProducto, 1);
      console.log("Producto eliminado:");
      console.log("Título:", productoEliminado[0].title);
      console.log("Descripción:", productoEliminado[0].description);
      console.log("Precio:", productoEliminado[0].price);
      console.log("Thumbnail:", productoEliminado[0].thumbnail);
      console.log("Stock:", productoEliminado[0].stock);
    } else {
      console.log("Producto no encontrado.");
    }
  }
}

// Ejemplo de uso
const manager = new ProductManager();
manager.addProduct(
  "Camiseta",
  "Camiseta de algodón",
  20,
  "thumbnail_cami.jpg",
  "PROD001",
  10
);
manager.addProduct(
  "Pantalón",
  "Pantalón vaquero",
  30,
  "thumbnail_pantalon.jpg",
  "PROD002",
  5
);

manager.listarProductos();

manager.getProduct(0);
manager.getProductById("PROD002");
manager.eliminarProducto("PROD001");
manager.listarProductos();
``
