import { request, response } from "express";
import passport from "passport";


export const passportCall = (strategy) => { // creamos una función que va a recibir una estrategia
    
    return async (req=request , res=response, next) => { // utilizamos una función de orden superior que nos retorna una función asíncrona

        passport.authenticate(strategy, (error, user, info) => {
            
            if(error) return next(error);
            if(!user) return res.status(401).json({status: "error", message: info.message ? info.message : info.toString()}); // validamos que si no obtenemos el usuario no muestre el mensaje configurado en la estrategia, y si no hay mensaje configuramos que llegue me lo transforme en un String
            
            req.user = user; // si no llega un error o no llega un mensaje de error asignamos "user" a req.user

            next();
        })(req, res, next);

    }; 
};

export const authorization = (role) => { // con la función "authorization" verificamos si tienen permisos según el "role" que tenga el usuario

    return async (req = request, res = response , next) => {
        
        if (!req.user) return res.status(401).json({status: "error", message: "Unauthorized"});
        if (req.user.role !== role) return res.status(403).json({status: "error", message: "User is not authorized"});

        next();
    }
}

