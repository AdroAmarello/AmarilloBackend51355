import { Router } from "express";
import { authorization, passportCall } from "../middlewares/passport.middlewares.js";
import cartsController from "../controllers/carts.controller.js";
import { checkProductAndCart } from "../middlewares/checkProductAndCart.middlewares.js";
import { isUserCart } from "../middlewares/isUserCart.js";

const router = Router();

// creamos solicitud/peticiones
router.post("/", passportCall("jwt"), authorization("user"), cartsController.createCart);
router.get("/:cid", passportCall("jwt"), authorization("user"), cartsController.getCartById);
router.post("/:cid/product/:pid", passportCall("jwt"), authorization("user"), checkProductAndCart, isUserCart, cartsController.addProductToCart);
router.put("/:cid/product/:pid", passportCall("jwt"), authorization("user"), checkProductAndCart, cartsController.updateQuantityOfProduct);
router.delete("/:cid/product/:pid", passportCall("jwt"), authorization("user"), checkProductAndCart, cartsController.deleteProductFromCart);
router.delete("/:cid", passportCall("jwt"), authorization("user"), cartsController.clearCart);

router.get("/:cid/purchase", passportCall("jwt"), authorization("user"), cartsController.purchaseCart);

export default router;