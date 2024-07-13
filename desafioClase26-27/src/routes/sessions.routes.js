import { Router } from "express";
import sessionsController from "../controllers/sessions.controller.js";
import { authorization, passportCall } from "../middlewares/passport.middlewares.js";
import { userLoginValidator } from "../validators/userLogin.validator.js";


const router = Router();

router.post("/register", passportCall("register"), sessionsController.userRegister); // endpoint de registro con middleware de passport y el nombre de la estrategia
router.post("/login", passportCall("login"), sessionsController.userLogin); // endpoint de login con middleware de passport y el nombre de la estrategia
router.post("/jwt", userLoginValidator ,passportCall("login"), sessionsController.userLoginJWT); // endpoint de login con middleware de passport y el nombre de la estrategia
router.get("/google", passportCall("google", {
	scope: ["https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"],
	session: false,
	}), sessionsController.userGoogle); // endpoint de google)
router.get("/current", passportCall("jwt"), authorization("user"), sessionsController.userCurrent); // endpoint para comprobar el token mediante la estrategia de "jwt"
router.get("/logout", sessionsController.userLogout); // endpoint de logout
	
export default router;