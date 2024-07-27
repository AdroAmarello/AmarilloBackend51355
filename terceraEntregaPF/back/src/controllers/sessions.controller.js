import { userResponseDto } from "../dto/user-response.dto.js";
import { createToken } from "../utils/jwt.js";


//Lógica de registro
const userRegister = async (req, res) => {
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
};

//Lógica de login con JWT
const userLoginJWT = async (req, res) => {
	try {

		const user = req.user;
		const token = createToken(user)

		//Seteamos el token en una cookie 
		res.cookie("token", token, { httpOnly: true}); //guardamos el token en una cookie y agregamos el "httpOnly" como seguridad para que no puedan ingresar a la cookie si no es por una petición http
		const userDto = userResponseDto(user);
		return res.status(200).json({ status: "success", payload: userDto, token });
		
	} catch (error) {
        console.log(error);
		return res.status(500).json({
            status: "Error",
			response: "Error interno del servidor",
		}); // se establece el estatus del error y un mensaje para su corrección
	}
};

//Lógica de login con Google
const userLoginGoogle = async (req, res) => {
	try {
		return res.status(200).json({ status: "success", payload: req.user });
		
	} catch (error) {
        console.log(error);
		return res.status(500).json({
            status: "Error",
			response: "Error interno del servidor",
		}); // se establece el estatus del error y un mensaje para su corrección
	}
};

//lógica de chequeo de session
const userCurrent = (req, res) => {
	try {
		const user = userResponseDto(req.user)
		return res.status(200).json({ status: "success", payload: user });

	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: "Error",
			response: "Error interno del servidor",
		}); // se establece el estatus del error y un mensaje para su corrección
		
	}
};

//lógica de logout de usuario
const userLogout = async (req, res) => {
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

export default {
    userRegister,
    userLoginJWT,
    userLoginGoogle,
    userCurrent,
    userLogout
}