import express from 'express'; // importamos el módulo de express para crear el servidor
import router from './src/routes/index.js'; // importamos el router principal
import { connectMongoDB } from './src/config/mongoDb.config.js';
import session from "express-session"; // importamos el módulo de session
import MongoStore from 'connect-mongo';

connectMongoDB(); // llamamos a la función para conectar con la base de datos de mongo
//para crear una aplicación/servidor de express

const app = express();

const urlDbMongo = ""; // utilizar url de Mongo 
//para configurar el servidor con determinadas funcionalidades se aplican los middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); //para leer queries y params
app.use(session({ // configuramos nuestro modulo session
    store: MongoStore.create({ // vinculamos al sesión con Mongo Atlas
        mongoUrl: urlDbMongo, // Utilizamos la misma URL de nuestro Mongo Atlas
        ttl: 15 // tiempo de conexión
    }),
    secret: 'CodigoSecreto',
    resave: true,
    saveUninitialized: true
}));

//para configurar las rutas
app.use("/api", router);

// para inicializar la app de express configuro el puerto
const port = 8080;
const ready = console.log("Server ready on port "+port); //se define callback con mensaje de que el servidor se encuentra activo

//para inicializar el servidor
app.listen(port, ready);