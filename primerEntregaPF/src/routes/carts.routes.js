import { Router } from "express";
import cartsManager from "../managers/cartsManager.js" // importamos el cartManager para utilizar las funciones

const router = Router();

// creamos solicitud/peticiones
router.post("/", createCart);
router.get("/:cid", cartById);
router.post("/:cid/product/:pid", addProductToCart)

async function createCart (req, res) {
    try {
        const cart = cartsManager.createCart();

        return res.json({status: 201, response: cart});

    } catch (error) {
        console.error(error);
        return res.json({status: error.status || 500, response: error.message || "Error"});
    }
}; //lógica para crear un carrito

async function cartById (req, res) {
    try {
        const { cid } = req.params;
        const cart = await cartsManager.getCartById(cid);

        if(cart) {
            return res.json({ status: 200, response: cart}) // se muestra el carrito con el id correspondiente
        } else {
            const error = new Error("Not found!");
            error.status = 404;
            throw error; // si el id ingresado en la ruta no existe se crea el error para manejarlo con el catch
        }        
    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "Error" }); 
    }
}; //lógica de petición un carrito por id

async function addProductToCart (req, res) {
    try {
        const { cid, pid } = req.params;
        const cart = await cartsManager.addProductToCart(cid, pid);

        if(cart) {
            return res.json({ status: 200, response: cart}) // se muestra el carrito con el id correspondiente
        } else {
            const error = new Error("Not found!");
            error.status = 404;
            throw error; // si el id ingresado en la ruta no existe se crea el error para manejarlo con el catch
        }        
    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "Error" }); 
        }
}

export default router;