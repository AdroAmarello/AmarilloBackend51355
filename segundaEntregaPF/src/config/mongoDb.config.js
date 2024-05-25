import mongoose from "mongoose"; // Importamos el modulo de mongoose

const urlDb = "mongodb+srv://adroamarillo:amarill0DB@e-commerce.vohxlk3.mongodb.net/ecommerce"; // creamos una variable para la url de la base de datos de mongo Atlas
    

export const connectMongoDB = async () => {
	try {
		// Conexión con la base de datos
		mongoose.connect(urlDb);
		console.log("Mongo DB Conectado");
	} catch (error) {
		console.log(error);
	}
};
