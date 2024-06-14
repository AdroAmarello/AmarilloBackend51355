import { Router} from "express";
import usersDao from "../dao/mongoDao/users.dao.js";
import { isValidPassword } from "../utils/hashPassword.js";
import passport from "passport";
import { createToken, verifyToken } from "../utils/jwt.js";


const router = Router();

router.post("/register", passport.authenticate("register"), userRegister); // endpoint de registro con middleware de passport y el nombre de la estrategia
router.post("/login", passport.authenticate("login"), userLogin); // endpoint de login con middleware de passport y el nombre de la estrategia
router.get("/google", passport.authenticate("google", {
	scope: ["https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"],
	session: false,
	}), userGoogle); // endpoint de google)
router.post("/jwt", passport.authenticate("login"), userLoginJWT); // endpoint de login con middleware de passport y el nombre de la estrategia
router.get("/current", userCurrent); // endpoint para comprobar el token
router.get("/logout", userLogout); // endpoint de logout
	
//Lógica de callbacks
//Lógica de registro
async function userRegister(req, res) {
	try {
		//Delegamos la responsabilidad del registro a Passport

		res.status(201).json({ status: "success", msg: "Usuario registrado"});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: "Error",
			response: "Error interno del servidor",
		}); // se establece el estatus del error y un mensaje para su corrección
	}
}

//Lógica de login
async function userLogin(req, res) {
	try {
		//Delegamos la responsabilidad del login a Passport

		return res.status(200).json({ status: "success", payload: req.user });
		
	} catch (error) {
        console.log(error);
		return res.status(500).json({
            status: "Error",
			response: "Error interno del servidor",
		}); // se establece el estatus del error y un mensaje para su corrección
	}
}

//Lógica de login con JWT
async function userLoginJWT(req, res) {
	try {

		const { email, password } = req.body; // tomamos del body el email y password
		
		const user = await usersDao.getByEmail(email); // Buscamos el usuario por el email
		if (!user || !isValidPassword(user, password)) res.status(403).json({ status: "error", msg: "Usuario o contraseña no válidos"});

		const token = createToken(user)

		//Seteamos el token en una cookie 
		res.cookie("token", token, { httpOnly: true}); //guardamos el token en una cookie y agregamos el "httpOnly" como seguridad para que no puedan ingresar a la cookie si no es por una petición http

		return res.status(200).json({ status: "success", payload: user, token });
		
	} catch (error) {
        console.log(error);
		return res.status(500).json({
            status: "Error",
			response: "Error interno del servidor",
		}); // se establece el estatus del error y un mensaje para su corrección
	}
};

function userCurrent (req, res) {
	try {
		const token= req.cookies.token; // Tomamos el "token" de la cookie
		const checkToken = verifyToken(token); //Utilizamos la función "verifyToken" para ckequear el token

		if(!checkToken) return res.status(403).json({ status:"Error", msg: "Token inválido"});

		return res.status(200).json({ status: "success", payload: checkToken });

	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: "Error",
			response: "Error interno del servidor",
		}); // se establece el estatus del error y un mensaje para su corrección
		
	}
};

//Lógica de login con Google
async function userGoogle(req, res) {
	try {
		return res.status(200).json({ status: "success", payload: req.user });
		
	} catch (error) {
        console.log(error);
		return res.status(500).json({
            status: "Error",
			response: "Error interno del servidor",
		}); // se establece el estatus del error y un mensaje para su corrección
	}
}

async function userLogout (req, res) {
    try {
        req.session.destroy(); // utilizamos el método destroy para eliminar la session
        
        res.status(200).json({ status: "success", response: "Sesión cerrada con éxito" });
        
        
    } catch (error) {
        console.log(error);
		return res.status(500).json({
			status: "Error",
			response: "Error interno del servidor",
		}); // se establece el estatus del error y un mensaje para su corrección
        
    }
}

export default router;
