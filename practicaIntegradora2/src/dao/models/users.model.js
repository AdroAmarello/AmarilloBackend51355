import mongoose from "mongoose";

const usersCollection = "user"; // creamos colección de usuarios

const usersSchema = new mongoose.Schema({
	// creamos un esquema cómo será el usuario
	name: { type: String, required: true},
    lastName: { type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true // establecemos que el email será del tipo string, que sea requerido y que tendrá la propiedad "unique" en true para que no se pueda repetir otro usuario con el mismo correo
    },
    password: { type: String, required: true},
    account: { type: mongoose.Schema.Types.ObjectId, ref: "account"} // como es un ejemplo pequeño no se crea como array porque sólo tendrá una cuenta.
});

export const usersModel = mongoose.model(usersCollection, usersSchema);
