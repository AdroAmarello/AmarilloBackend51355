import { cartsModel } from "../models/carts.model.js"; // importamos el cartModel para utilizar los modelos para interactuar con la base de datos
import { productModel } from "../models/product.model.js";

const getById = async (id) => {
    const cart = await cartsModel.findById(id); // utilizamos el método findById para traer un elemento por id
    return cart;
}

const create = async (data) => {
    const cart = cartsModel.create(data); // utilizamos el método create para crear un carrito
    return cart;
}

//Función para agregar un producto por pid a un carrito con cid 

const addProductToCart = async (cid, pid) => {
    const product = await productModel.findById(pid);
    if (!product) return {
    product: false}; // si no existe producto retornamos un false 
    
    await cartsModel.findByIdAndUpdate(cid, { $push: {products: product} }) // primero necesitamos el cid para ubicar el carrito y luego utilizamos el método $push para insertar el producto dentro del array products

    const cart = await cartsModel.findById(cid); // usamos el findById para buscar el carrito modificado con el producto agregado

    if(!cart) return { // validamos si existe cid de carrito
        cart: false
    };

    return cart;
}

export default {
    getById,
    create,
    addProductToCart,
};