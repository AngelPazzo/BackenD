# BackenD
proyecto de Backend

# RealTimeProducts

RealTimeProducts es una aplicación web que muestra una lista de productos en tiempo real utilizando WebSockets. Los usuarios pueden ver la lista de productos actualizada en tiempo real sin necesidad de recargar la página.

## Características

- Muestra una lista de productos en la página de inicio.
- Permite agregar nuevos productos utilizando un formulario en la página de inicio.
- Utiliza WebSockets para actualizar la lista de productos en tiempo real para todos los clientes conectados.

## Tecnologías utilizadas

- Node.js
- Express.js
- Socket.io
- Handlebars (templating engine)
- HTML/CSS (estilos)

## Instrucciones de uso

1. Clona este repositorio en tu máquina local.
2. Ejecuta el siguiente comando para instalar las dependencias:
npm install


3. Para iniciar el servidor, ejecuta el siguiente comando:
npm run start


4. Abre tu navegador y navega a `http://localhost:3000` para ver la lista de productos y el formulario para agregar nuevos productos.

5. Para ver la lista de productos en tiempo real, abre otra pestaña del navegador y navega a `http://localhost:3000/realtimeproducts`. Los cambios realizados en una pestaña se reflejarán automáticamente en la otra pestaña sin necesidad de recargar la página.

## Notas

- Los productos se almacenan en un archivo JSON llamado `productos.json`.
- Al agregar un nuevo producto, el formulario enviará los datos a través de una solicitud POST al servidor, que luego procesará los datos y actualizará la lista de productos en el archivo `productos.json`.

## Contribuciones

Las contribuciones a este proyecto son bienvenidas. Si encuentras algún error o tienes alguna mejora, siéntete libre de crear un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Puedes consultar el archivo LICENSE para más detalles.


