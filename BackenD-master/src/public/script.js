// Conexión con el servidor
const socket = io();

// Escuchar el evento para actualizar la lista de productos
socket.on('update-products', (products) => {
  console.log('Actualizando lista de productos');
  console.log(products);
});

// Escuchar el evento para agregar un nuevo producto

socket.on('new-product', (productName) => {
  console.log(`Nuevo producto: ${productName}`);
});

// Escuchar el evento para eliminar un producto
socket.on('delete-product', (productName) => {
  console.log(`Producto eliminado: ${productName}`);
});

// Escuchar el evento para actualizar un producto
socket.on('update-product', (productName) => {
  console.log(`Producto actualizado: ${productName}`);
});

// Cuando el documento esté listo
$(document).ready(() => {
  // Agregar un nuevo producto
  $('#newProductForm').submit((e) => {
    e.preventDefault();

    const title = $('#title').val();
    const price = $('#price').val();
    const thumbnail = $('#thumbnail').val();

    // Enviar el nuevo producto al servidor
    socket.emit('new-product', title);

    // Limpiar el formulario
    $('#newProductModal').modal('hide');
    $('#newProductForm').trigger('reset');
  }

  );

  // Eliminar un producto
  $('#deleteProductForm').submit((e) => {
    e.preventDefault();

    const title = $('#title').val();

    // Enviar el producto a eliminar al servidor
    socket.emit('delete-product', title);

    // Limpiar el formulario
    $('#deleteProductModal').modal('hide');
    $('#deleteProductForm').trigger('reset');
  }

  );

  // Actualizar un producto
  $('#updateProductForm').submit((e) => {
    e.preventDefault();

    const title = $('#title').val();
    const price = $('#price').val();
    const thumbnail = $('#thumbnail').val();

    // Enviar el producto a actualizar al servidor
    socket.emit('update-product', title);

    // Limpiar el formulario
    $('#updateProductModal').modal('hide');
    $('#updateProductForm').trigger('reset');
  }

  );
}

);