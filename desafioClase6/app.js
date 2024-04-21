import express, { response } from 'express'; // importamos el módulo de express para crear el servidor
import productManager from './src/productManager.js'; // importamos el productManager para utilizar las funciones

//para crear una aplicación/servidor de express
const app = express();

//para configurar el servidor con determinadas funcionalidades se aplican los middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); //para leer queries y params

// creamos solicitud/peticiones
app.get("/products", async (req, res) => {
    try {
        const { limit } = req.query; // se toma el query y se desestructura en limit
        const products = await productManager.getProducts(limit); //se llama a la función "getProducts" y se le asigna el parámetro limit

        return res.json({ status: 200, response: products}); // si no da error se muestra el status 200 (todo ok) y como response con el método json del objeto de respuesta se muestran los productos
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, response: error.message }); // se establece el estatus del error y un mensaje para su corrección
    }
});

app.get("/products/:pid", async (req, res) => { // petición de producto por id
    try {
        const { pid } = req.params; // se desestructura el parámetro id como pid
        
        const product = await productManager.getProductById(+pid); //se llama a la función "getProductById" y se le asigna el "pid" por parámetro

        return res.json({ status: 200, response: product // se muestra el producto con el id correspondiente
        })
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, response: error.message });
    }
});

// para inicializar la app de express configuro el puerto
const port = 8080;
const ready = console.log("Server ready on port "+port); //se define callback con mensaje de que el servidor se encuentra activo

//para inicializar el servidor
app.listen(port, ready);