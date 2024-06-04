import mongoose from "mongoose";

const usersCollection = "user"; // creamos colección de usuarios

const usersSchema = new mongoose.Schema({
	// creamos un esquema cómo será el usuario
	firstName: String,
    lastName: String,
    email: String,
    password: String,
    age: Number
});

export const usersModel = mongoose.model(usersCollection, usersSchema);
