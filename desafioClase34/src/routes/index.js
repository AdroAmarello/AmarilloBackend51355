//Aquí indexaremos las rutas de los productos y el carrito

import { Router } from "express";
import productsRouters from "./products.routes.js" // Se importan las rutas de los productos
import cartsRouters from "./carts.routes.js" // Se importan las rutas del cart
import sessionRouters from "./sessions.routes.js" // Se importan las rutas de session
import { logger } from "../utils/logger.js";

const router = Router();


//Indexamos los endpoints 
router.use("/products", productsRouters); // Utilizamos el middleware isLogin para hacer la verificación en todos los endpoints de productos
router.use("/carts", cartsRouters);
router.use("/sessions", sessionRouters);


//Endpoint y Lógica para testear loggers
router.get("/loggerTest", loggersTests);

async function loggersTests (req, res) {
    logger.error("This is a message of error");
    logger.warn("This is a message of warning");
    logger.info("This is a message of info");
    logger.http("This is a message of http");

    return res.status(200).json({status: "success"})
}

export default router;