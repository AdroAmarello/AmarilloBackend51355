import mongoose from "mongoose"; // Importamos el modulo de mongoose
import envs from "./env.config.js";

const urlDbMongo = envs.MONGO_URL; // creamos una variable para la url de la base de datos de mongo Atlas
    

export const connectMongoDB = async () => {
	try {
		// Conexión con la base de datos
		mongoose.connect(urlDbMongo);
		console.log("Mongo DB Conectado");
	} catch (error) {
		console.log(error);
	}
};
