import mongoose from "mongoose";

const accountsCollection = "account"; // creamos colección de cuentas

const accountsSchema = new mongoose.Schema({
	number: { type: String, required: true }, // para no tener problemas con la cantidad de caracteres el número de cuenta será de tipo String
    alias: { type: String, required: true },
    balance: { type: Number, default: 0 }, // aquí estará el dinero que posee nuestra cuenta 
    userId: { type: String, default: null} // por si quiero buscar una cuenta utilizo también el userId
});

export const accountsModel = mongoose.model(accountsCollection, accountsSchema);
