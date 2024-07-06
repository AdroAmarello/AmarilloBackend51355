import mongoose from "mongoose";

const movementsCollection = "movement"; // creamos colección de movimientos

const movementsSchema = new mongoose.Schema({
	date: { type: Date, default: Date.now() }, // definimos la fecha del movimiento
    description: { type: String, default: ""},
    amount: { type: Number, required: true}, // definimos el amount del movimiento de tipo número
    type: { type: String, required: true}, // definimos el tipo de movimiento "transferencia, extracción o depósito"
    originAccountId: { type: String, required: true}, // asignamos el id de la cuenta de origen
    destinationAccountId: { type: String}, // asignamos el id de la cuenta de la cuenta destino
    userId: { type: String}
});

export const movementsModel = mongoose.model(movementsCollection, movementsSchema);
