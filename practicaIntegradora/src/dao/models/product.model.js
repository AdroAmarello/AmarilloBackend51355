import mongoose from "mongoose";

const productCollection = "products"; // creamos colección de productos

const productSchema = new mongoose.Schema({
	// creamos un esquema cómo será el producto
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	thumbnail: {
		type: Array,
		default: [],
	},
	code: {
		type: String,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},
	status: {
		type: Boolean,
		default: true,
	},
	price: {
		type: Number,
		require: true,
	},
	category: {
		type: String,
		require: true,
	},

});

export const productModel = mongoose.model(productCollection, productSchema);
