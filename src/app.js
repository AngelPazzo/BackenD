import express from 'express';
import fs from 'fs';

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/form.html');
});

app.post('/api/products', (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  const product = {
    id: generateId(),
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails: thumbnails.split(',').map(thumbnail => thumbnail.trim())
  };
  
  const products = loadProductsFromFile();
  products.push(product);
  saveProductsToFile(products);

  res.redirect('/success.html');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

function generateId() {
  // Implementa la lógica para generar un ID único para cada producto
}

function loadProductsFromFile() {
  try {
    const fileData = fs.readFileSync('productos.json', 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error(`Error al cargar el archivo de productos: ${error}`);
    return [];
  }
}

function saveProductsToFile(products) {
  try {
    fs.writeFileSync('productos.json', JSON.stringify(products, null, 2));
    console.log('Productos guardados exitosamente.');
  } catch (error) {
    console.error(`Error al guardar el archivo de productos: ${error}`);
  }
}
