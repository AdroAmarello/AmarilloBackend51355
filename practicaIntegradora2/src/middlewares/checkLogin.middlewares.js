//Creamos una validación con joi
import { request, response } from "express";
import joi from "joi";

export const checkLogin = (req = request, res = response, next) => {
try {
    
    const schema = joi.object({ // creamos un schema con un objeto con las características que tiene que tener
        email: joi.string().email().required().messages ({
            "string.email" : "E-mail con formato inválido",
            "any.required":"El email es obligatorio"
        }), // concatenamos tipos de datos y propiedades y configuramos un mensaje personalizado
        password: joi.string().min(3).required().messages ({
            "string.min" : "El password debe contener al menos 3 caracteres",
            "any.required":"El password es obligatorio"
        })
    })
    
    // para validar
    const { error } = schema.validate(req.body); // del schema creado validar los datos que recibo del body
    
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    };

    next();

    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({status: 'error', message: "Error interno del servidor"});
    }

};