//Aquí indexaremos las rutas de los productos y el carrito

import { Router } from "express";
import productsRouters from "./products.routes.js" // Se importan las rutas de los productos
import cartsRouters from "./carts.routes.js" // Se importan las rutas del cart
import sessionRouters from "./sessions.routes.js" // Se importan las rutas de session
import { isLogin } from "../middlewares/isLogin.middlewares.js"; // Se importa el middleware de verificación de Login

const router = Router();

//Indexamos los endpoints 
router.use("/products", isLogin, productsRouters); // Utilizamos el middleware isLogin para hacer la verificación en todos los endpoints de productos
router.use("/carts", cartsRouters);
router.use("/sessions", sessionRouters);

export default router;