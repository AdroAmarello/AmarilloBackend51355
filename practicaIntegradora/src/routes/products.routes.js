import { Router } from "express";
import productDao from "../dao/mongoDao/product.dao.js"; // importamos la capa que interactúa con nuestra base de datos
// import productManager from "../dao/fsManagers/productManager.js" importamos el productManager para utilizar las funciones - se cambia el uso de fs por MongoDB

const router = Router();

// creamos solicitud/peticiones
router.get("/", products);
router.get("/:pid", productById);
router.post("/", addProduct);
router.put("/:pid", updateProductById);
router.delete("/:pid", deleteProductById);

//para configurar las callbacks
// en lugar de utilizar los métodos desde fs se utiliza el productDao
async function addProduct(req, res) { // lógica de carga de un nuevo producto
    try {
        const product = req.body;

        const newProduct = await productDao.create(product);
        
        return res.json({ status: 201, response: newProduct});

    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 400, response: error.message || "Error" });
    }
};

async function products(req, res) { // lógica de petición de todos los productos o por un límite
    try {
        // const { limit } = req.query; // se toma el query y se desestructura en limit - COMENTAMOS ESTA LÍNEA PORQUE ESTAMOS EN UNA INSTANCIA PRIMARIA DEL USO DE MONGO
        const products = await productDao.getAll();
        if (products.length>0) {
            return res.json({ status: 200 , response: products}); // si no da error se muestra el status 200 (todo ok) y como response con el método json del objeto de respuesta se muestran los productos
        } else {
            const error = new Error ("Products not found");
            error.status = 404;
            throw error; // si no se encuentran productos se crea el error para manejarlo con el catch
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "Error" }); // se establece el estatus del error y un mensaje para su corrección
    }
}

async function productById (req, res) { // lógica de petición de producto por id
    try {
        const { pid } = req.params; // se desestructura el parámetro id como pid
        
        const product = await productDao.getById(pid); 

        if(product) {
            return res.json({ status: 200, response: product}) // se muestra el producto con el id correspondiente
        } else {
            const error = new Error("Not found!");
            error.status = 404;
            throw error; // si el id ingresado en la ruta no existe se crea el error para manejarlo con el catch
        }        
    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "Error" }); 
    }
};

async function updateProductById (req, res) { // lógica de modificación de un producto
    try {
        const { pid } = req.params; // captura el parámetro
        const dataProduct = req.body; // captura el objeto con las modificaciones

        const updateProduct = await productDao.update(pid, dataProduct);

        return res.json({ status: 200, response: updateProduct});
        
    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "Error" }); 
    }    
};

async function deleteProductById(req, res) { // lógica para eliminar un producto
    try {
        const { pid } = req.params;
        
        const product = await productDao.deleteOne(pid); // guardamos la respuesta en una constante que sera de tipo boolean
        if(product) { // verificamos la existencia del producto a eliminar
            return res.json({ status: 200, response: `El producto con ID ${pid} ha sido eliminado`}) // se asigna código de status y se informa la eliminación
        } else {
            const error = new Error("Not found!");
            error.status = 404;
            throw error; // si el id ingresado en la ruta no existe se crea el error para manejarlo con el catch
        }        

    } catch (error) {
        console.log(error);
        return res.json({ status: error.status || 500, response: error.message || "Error" });
    }
};

export default router;