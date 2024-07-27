import { request, response } from "express";
import productsServices from "../services/products.services.js";
import cartsServices from "../services/carts.services.js";

export const checkProductAndCart = async (req = request, res= response, next) => {
    const { cid, pid } = req.params;
    const product = await productsServices.getProductById(pid);
    const cart = await cartsServices.getCartById(cid)

    if(!product) return res.status(404).json({ status: "Error", response: `Product with id ${pid} not found`}); // validación si existe el pid
        
    if(!cart) return res.status(404).json({ status: "Error", response: `Cart with id ${cid} not found`}); // validación si existe el cid

    next();
};