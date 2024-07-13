import { Router } from "express";
import { authorization, passportCall } from "../middlewares/passport.middlewares.js";
import cartsController from "../controllers/carts.controller.js";

const router = Router();

// creamos solicitud/peticiones
router.post("/", passportCall("jwt"), authorization("user"), cartsController.createCart);
router.get("/:cid", passportCall("jwt"), authorization("user"), cartsController.cartById);
router.post("/:cid/product/:pid", passportCall("jwt"), authorization("user"), cartsController.addProductToCart)
router.put("/:cid/product/:pid", passportCall("jwt"), authorization("user"), cartsController.updateQuantityOfProduct)
router.delete("/:cid/product/:pid", passportCall("jwt"), authorization("user"),cartsController.deleteProductFromCart)
router.delete("/:cid", passportCall("jwt"), authorization("user"), cartsController.clearCart);


export default router;