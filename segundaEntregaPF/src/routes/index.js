//Aquí indexaremos las rutas de los productos y el carrito

import { Router } from "express";
import productsRouters from "./products.routes.js" // Se importan las rutas de los productos
import cartsRouters from "./carts.routes.js" // Se importan las rutas del cart

const router = Router();

//Indexamos los endpoints 
router.use("/products", productsRouters);
router.use("/carts", cartsRouters);

export default router;