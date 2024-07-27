import cartsServices from "../services/carts.services.js";
import ticketsServices from "../services/tickets.services.js";


//lógica para crear un carrito
async function createCart (req, res) {
    try {
        const cart = await cartsServices.createCart();

        res.status(201).json({status: "success", payload: cart});

    } catch (error) {
        console.error(error);
        return res.json({status: error.status || 500, response: error.message || "Error del servidor"});
    }
}; 

//lógica de petición un carrito por id
async function getCartById (req, res) {
    try {
        const { cid } = req.params;
        const cart = await cartsServices.getCartById(cid);

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
        const cart = await cartsServices.addProductToCart(cid, pid);
                
        return res.status(200).json({ status: "success", response: cart}); // se muestra el carrito con el id correspondiente
        
    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "Error del servidor" }); 
    }
};

//lógica para modificar la cantidad de un producto al carrito ingresada desde el body
async function updateQuantityOfProduct (req, res) {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await cartsServices.updateQuantityOfProduct(cid, pid, quantity);
        
        return res.status(200).json({ status: "success", payload: cart}); // se muestra el carrito con el id correspondiente
            
    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "Error del servidor" }); 
    }
};

//lógica para eliminar un producto del carrito
async function deleteProductFromCart (req, res) {
    try {
        const { cid, pid } = req.params;
        const cart = await cartsServices.deleteProductFromCart(cid, pid);
        
        return res.status(200).json({ status: "success", payload: cart}); // se muestra el carrito con el id correspondiente
        
    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "Error del servidor" }); 
    }
};

//lógica para eliminar todos los productos del carrito
async function clearCart (req, res) {
    try {
        const { cid } = req.params;
        const cart = await cartsServices.clearCart(cid);

        if(!cart) return res.status(404).json({ response: `Cart with id ${cid} not found`}); // si el id de carrito ingresado en la ruta no existe se informa
        
        res.json({ status: 200, response: `Cart with id ${cid} is empty`, payload: cart}) // se muestra el carrito con el id correspondiente

    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "Error del servidor" }); 
    }
}; 

//lógica de compra de carrito
async function purchaseCart (req, res) {
    try {
        const { cid } = req.params;
        const cart = await cartsServices.getCartById(cid);

        if(!cart) return res.status(404).json({ response: `Cart with id ${cid} not found`}); // si el id de carrito ingresado en la ruta no existe se informa

        // obtener el total del carrito
        const total = await cartsServices.purchaseCart(cid);

        //crear el ticket
        const ticket = await ticketsServices.createTicket(req.user.email, total);
        
        res.json({ status: 200, response: ticket }) // se muestra el carrito con el id correspondiente

    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "Error del servidor" }); 
    }
}

export default {
    createCart,
    getCartById,
    addProductToCart,
    updateQuantityOfProduct,
    deleteProductFromCart,
    clearCart,
    purchaseCart
}