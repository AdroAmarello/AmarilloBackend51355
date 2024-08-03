import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import { authorization, passportCall } from "../middlewares/passport.middlewares.js";

// import productManager from "../dao/fsManagers/productManager.js" importamos el productManager para utilizar las funciones - se cambia el uso de fs por MongoDB

const router = Router();

// creamos solicitud/peticiones
router.get("/", productsController.getProducts); 
router.get("/:pid", productsController.getProductById);

// solicitud de productos por mocks
router.get("/faker/mockingproducts", productsController.createAndGetProductsMock); // agregué al endpoint "/faker" porque de lo contrario entraba en conflicto con el "getProductById" creyendo que "mockingproducts" era un ID

router.post("/", passportCall("jwt"), authorization("admin"), /* productDataValidator, */ productsController.createProduct);
router.put("/:pid", passportCall("jwt"), authorization("admin"), productsController.updateProductById);
router.delete("/:pid", passportCall("jwt"), authorization("admin"),  productsController.deleteProductById);

export default router;
