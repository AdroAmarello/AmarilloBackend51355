import mongoose from "mongoose";

const cartsCollection = "carts"; // creamos colección de carritos

const cartsSchema = new mongoose.Schema({
	// creamos un esquema cómo será el carrito
	products: {
        type: Array,
        default: [],
    }
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);