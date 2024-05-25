import { Router } from "express";
import cartsDao from "../dao/mongoDao/carts.dao.js";

const router = Router();

// creamos solicitud/peticiones
router.post("/", createCart);
router.get("/:cid", cartById);
router.post("/:cid/product/:pid", addProductToCart)
router.put("/:cid/product/:pid", updateQuantityOfProduct)
router.delete("/:cid/product/:pid", deleteProductFromCart)
router.delete("/:cid", clearCart);

// se invoca la capa cartsDao
//lógica para crear un carrito
async function createCart (req, res) {
    try {
        const cart = await cartsDao.create();

        res.status(201).json({status: "success", payload: cart});

    } catch (error) {
        console.error(error);
        return res.json({status: error.status || 500, response: error.message || "Error del servidor"});
    }
}; 

//lógica de petición un carrito por id
async function cartById (req, res) {
    try {
        const { cid } = req.params;
        const cart = await cartsDao.getById(cid);

        if(!cart) return res.status(404).json({ response: `Cart with id ${cid} not found`}); // si el id de carrito ingresado en la ruta no existe se informa
        
        res.json({ status: 200, payload: cart}) // se muestra el carrito con el id correspondiente

    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "Error del servidor" }); 
    }
}; 

//lógica para añadir un producto al carrito
async function addProductToCart (req, res) {
    try {
        const { cid, pid } = req.params;
        const cart = await cartsDao.addProductToCart(cid, pid);
        
        if(cart.product == false) return res.status(404).json({ response: `Product with id ${pid} not found`}); // validación si existe el pid
        
        if(cart.cart == false) return res.status(404).json({ response: `Cart with id ${cid} not found`}); // validación si existe el cid
        
        return res.status(200).json({ status: "success", response: cart}); // se muestra el carrito con el id correspondiente
        
    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "Error del servidor" }); 
    }
}
//lógica para modificar la cantidad de un producto al carrito ingresada desde el body
async function updateQuantityOfProduct (req, res) {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await cartsDao.updateQuantityOfProduct(cid, pid, quantity);
        
        if(cart.product == false) return res.status(404).json({ response: `Product with id ${pid} not found`}); // validación si existe el pid
        
        if(cart.cart == false) return res.status(404).json({ response: `Cart with id ${cid} not found`}); // validación si existe el cid

        return res.status(200).json({ status: "success", payload: cart}); // se muestra el carrito con el id correspondiente
            
    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "Error del servidor" }); 
    }
}

//lógica para eliminar un producto del carrito
async function deleteProductFromCart (req, res) {
    try {
        const { cid, pid } = req.params;
        const cart = await cartsDao.deleteProductFromCart(cid, pid);
        
        if(cart.product == false) return res.status(404).json({ response: `Product with id ${pid} not found`}); // validación si existe el pid
        
        if(cart.cart == false) return res.status(404).json({ response: `Cart with id ${cid} not found`}); // validación si existe el cid
        
        return res.status(200).json({ status: "success", payload: cart}); // se muestra el carrito con el id correspondiente
        
    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "Error del servidor" }); 
    }
}
//lógica para eliminar todos los productos del carrito
async function clearCart (req, res) {
    try {
        const { cid } = req.params;
        const cart = await cartsDao.clearCart(cid);

        if(!cart) return res.status(404).json({ response: `Cart with id ${cid} not found`}); // si el id de carrito ingresado en la ruta no existe se informa
        
        res.json({ status: 200, response: `Cart with id ${cid} is empty`, payload: cart}) // se muestra el carrito con el id correspondiente

    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "Error del servidor" }); 
    }
}; 

export default router;