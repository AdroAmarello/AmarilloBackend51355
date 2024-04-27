import express from 'express'; // importamos el módulo de express para crear el servidor
import router from './src/routes/index.js'; // importamos el router principal

//para crear una aplicación/servidor de express
const app = express();

//para configurar el servidor con determinadas funcionalidades se aplican los middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); //para leer queries y params

//para configurar las rutas
app.use("/api", router);

// para inicializar la app de express configuro el puerto
const port = 8080;
const ready = console.log("Server ready on port "+port); //se define callback con mensaje de que el servidor se encuentra activo

//para inicializar el servidor
app.listen(port, ready);