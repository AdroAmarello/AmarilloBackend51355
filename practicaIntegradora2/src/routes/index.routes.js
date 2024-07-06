//Aquí indexaremos las rutas de los usuarios y las cuentas

import { Router } from "express";
import usersRouters from "./users.routes.js" // Se importan las rutas de los usuarios
import accountsRouters from "./accounts.routes.js" // Se importan las rutas de las cuentas
import { isLogin } from "../middlewares/isLogin.middlewares.js"; // Se importa el middleware de verificación de Login

const router = Router();

//Indexamos los endpoints 
router.use("/users", usersRouters); // Utilizamos el middleware isLogin para hacer la verificación en todos los endpoints de usuarios
router.use("/accounts", accountsRouters);

export default router;