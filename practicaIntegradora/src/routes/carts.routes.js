import { Router } from "express";
import cartDao from "../dao/mongoDao/carts.dao.js";
import cartsDao from "../dao/mongoDao/carts.dao.js";

const router = Router();

// creamos solicitud/peticiones
router.post("/", createCart);
router.get("/:cid", cartById);
router.post("/:cid/product/:pid", addProductToCart)

// se invoca la capa cartDao
async function createCart (req, res) {
    try {
        const cart = cartDao.create();

        return res.json({status: 201, response: cart});

    } catch (error) {
        console.error(error);
        return res.json({status: error.status || 500, response: error.message || "Error"});
    }
}; //lógica para crear un carrito

async function cartById (req, res) {
    try {
        const { cid } = req.params;
        const cart = await cartDao.getById(cid);

        if(!cart) return res.status(404).json({ response: `Cart with id ${cid} not found`}); // si el id de carrito ingresado en la ruta no existe se informa
        
        res.json({ status: 200, response: cart}) // se muestra el carrito con el id correspondiente

    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "Error" }); 
    }
}; //lógica de petición un carrito por id

async function addProductToCart (req, res) {
    try {
        const { cid, pid } = req.params;
        const cart = await cartsDao.addProductToCart(cid, pid);
        
        if(cart.product == false) return res.status(404).json({ response: `Product with id ${pid} not found`}); // validación si existe el pid

        if(cart.cart == false) return res.status(404).json({ response: `Cart with id ${cid} not found`}); // validación si existe el cid

        return res.status(200).json({ status: "success", response: cart}); // se muestra el carrito con el id correspondiente
            
    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "Error" }); 
        }
}

export default router;