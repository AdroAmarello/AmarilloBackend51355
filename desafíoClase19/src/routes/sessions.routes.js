import { Router, response } from "express";
import usersDao from "../dao/mongoDao/users.dao.js";


const router = Router();

router.post("/register", userRegister); // endpoint de registro
router.post("/login", userLogin); // endpoint de login
router.get("/logout", userLogout); // endpoint de logout

//Lógica de callbacks
//Lógica de registro
async function userRegister(req, res) {
	try {
		const userData = req.body; // tomamos la data del user desde el body
		const newUser = await usersDao.create(userData); // utilizamos la función create del userDao y le pasamos userData

		if (!newUser)
			return res.status(400).json({ status: "Error", response: "No se pudo crear el usuario" }); // manejamos el error en caso de que haya habido algún problema de conexión con Mongo

		res.status(201).json({ status: "success", payload: newUser });
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
		const { email, password } = req.body; // tomamos la data del user desde el body y desestructuramos el email y password

		// Verificamos que el usuario sea administrador
		if (email === "adminCoder@coder.com" && password === "adminCod3r123") { // si se cumplen las dos condiciones al usuario se le otorgará el rol de admin
			req.session.user = {
				email,
				role: "admin",
			};
			return res.status(200).json({ status: "success", payload: req.session.user });
		}

        // Si no es Administrador
        const user = await usersDao.getByEmail(email); // creamos el método en el Dao para buscar por email del user

        // Verificamos el usuario y contraseña
        if(!user || user.password !== password) {
            return res.status(401).json({ status: "Error", response: "Email o password no válidos" }); // manejamos el error en caso de que no exista el usuario o la contraseña sea incorrecta
        }

        //Asignamos el rol de user
        req.session.user = {
            email,
            role: "user"
        }

		res.status(200).json({ status: "success", payload: req.session.user });
        
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
