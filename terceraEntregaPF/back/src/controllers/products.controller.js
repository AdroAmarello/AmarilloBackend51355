import productsServices from "../services/products.services.js";
// importamos la capa de servicios que interactúa con la de repositorio


// lógica de petición de todos los productos o por un límite
async function getProducts(req, res) {
	try {
		const { limit, page, sort, category, status } = req.query; // se toma el query y se desestructuran los parámetros de búsqueda opcionales

		const optionsFilter = {
			// creamos un objeto con los parámetros de búsqueda que no poseen condicionales
			limit: limit || 10,
			page: page || 1,
			sort: {
				price: sort === "asc" ? 1 : -1,
			},
			lean: true,
		};

		if (status) {
			//validamos si se solicita el query "status"
			const products = await productsServices.getProducts({ status }, optionsFilter);
			return res.status(200).json({ status: "success", products });
		}

		if (category) {
			//validamos si se solicita el query "category"
			const products = await productsServices.getProducts({ category }, optionsFilter);
			return res.status(200).json({ status: "success", products });
		}
        
        const products = await productsServices.getProducts({}, optionsFilter); // si no ingresa a ninguna de las validaciones anteriores devuelve los productos según "optionsFilter"
		
        res.status(200).json({ status: "success", products });
		
	} catch (error) {
		console.log(error);
		return res.json({
			status: error.status || 500,
			response: error.message || "Error del servidor",
		}); // se establece el estatus del error y un mensaje para su corrección
	}
};

// lógica de petición de producto por id
async function getProductById(req, res) {
	try {
		const { pid } = req.params; // se desestructura el parámetro id como pid

		const product = await productsServices.getProductById(pid);

		if (product) {
			return res.json({ status: 200, response: product }); // se muestra el producto con el id correspondiente
		} else {
			const error = new Error("Not found!");
			error.status = 404;
			throw error; // si el id ingresado en la ruta no existe se crea el error para manejarlo con el catch
		}
	} catch (error) {
		console.log(error);
		return res.json({
			status: error.status || 500,
			response: error.message || "Error del servidor",
		});
	}
};

// lógica de carga de un nuevo producto
async function createProduct(req, res) {
	try {
		const product = req.body;

		const newProduct = await productsServices.createProduct(product);

		return res.json({ status: 201, response: newProduct });
	} catch (error) {
		console.log(error);
		return res.json({
			status: error.status || 400,
			response: error.message || "Error",
		});
	}
};

// lógica de modificación de un producto
async function updateProductById(req, res) {
	try {
		const { pid } = req.params; // captura el parámetro
		const dataProduct = req.body; // captura el objeto con las modificaciones

		const updateProduct = await productsServices.updateProductById(pid, dataProduct);

		return res.json({ status: 200, response: updateProduct });
	} catch (error) {
		console.log(error);
		return res.json({
			status: error.status || 500,
			response: error.message || "Error del servidor",
		});
	}
};

// lógica para eliminar un producto
async function deleteProductById(req, res) {
	try {
		const { pid } = req.params;

		const product = await productsServices.deleteProductById(pid); // guardamos la respuesta en una constante que sera de tipo boolean
		if (product) {
			// verificamos la existencia del producto a eliminar
			return res.json({
				status: 200,
				response: `El producto con ID ${pid} ha sido eliminado`,
			}); // se asigna código de status y se informa la eliminación
		} else {
			const error = new Error("Not found!");
			error.status = 404;
			throw error; // si el id ingresado en la ruta no existe se crea el error para manejarlo con el catch
		}
	} catch (error) {
		console.log(error);
		return res.json({
			status: error.status || 500,
			response: error.message || "Error del servidor",
		});
	}
};

export default {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
}