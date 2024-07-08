import { Router } from "express";
import passport from "passport";
import { createToken } from "../utils/jwt.js";
import { checkLogin } from "../middlewares/checkLogin.middlewares.js";

const router = Router();


//creamos solicitud/peticiones
router.post("/register", passport.authenticate("register"), registerUser);
router.post("/login", checkLogin, passport.authenticate("login", {session: false}), loginUser);

//Configuramos callbacks
//lógica de registro de usuarios
async function registerUser(req, res) {
    try {

        res.status(201).json({status: "success", user: req.user })
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({status: 'error', message: "Error interno del servidor"});
    }

}
//lógica de login de usuarios
async function loginUser(req, res) {
    try {
        const token = createToken(req.user) // creamos el token para el login de usuario para guardarlo en una cookie
        res.cookie("token", token, { httpOnly: true}) // creamos una cookie, asignamos el token y le agregamos la propiedad "httpOnly" para que no se pueda acceder todo el tiempo sólo en peticiones http
        res.status(200).json({status: "success", user: req.user })
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({status: 'error', message: "Error interno del servidor"});
    }

}

export default router;