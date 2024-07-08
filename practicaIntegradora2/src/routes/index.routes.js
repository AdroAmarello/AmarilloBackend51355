//Aquí indexaremos las rutas de los usuarios y las cuentas

import { Router } from "express";
import usersRouters from "./users.routes.js" // Se importan las rutas de los usuarios
import accountsRouters from "./accounts.routes.js" // Se importan las rutas de las cuentas
import movementsRouters from "./movements.routes.js" // Se importan las rutas de los movimientos

const router = Router();

//Indexamos los endpoints 
router.use("/users", usersRouters); 
router.use("/accounts", accountsRouters);
router.use("/movements", movementsRouters); 

export default router;