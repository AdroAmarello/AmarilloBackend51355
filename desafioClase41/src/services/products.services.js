import { productResponseDto } from "../dto/product-response.dto.js";
import productsRepository from "../persistences/mongo/repositories/products.repository.js";
import error from "../errors/customErrors.js"


// lógica de petición de todos los productos o por un límite
const getProducts = async (query, options) => {
	const products = await productsRepository.getProducts(query, options);
    return products;
};

// lógica de petición de producto por id
const getProductById = async (id) => {
    const productData = await productsRepository.getProductById(id);
    if (!productData) throw error.notFoundError(`Product id:${id} not found`);
    const product = productResponseDto(productData);
    return product;
};

// lógica de carga de un nuevo producto
const createProduct = async (data, user) => {
    let productData = data;
    if (user.role === "premium") {
        productData = { ...data, owner: user._id};
    };

	const product = await productsRepository.createProduct(productData);
    if (!product) throw error.badRequestError();
    return product;
};

// lógica de modificación de un producto
const updateProductById = async (id, data) => {
	const product = await productsRepository.updateProductById(id, data);
    if (!product) throw error.notFoundError(`Product id:${id} not found`);
    return product;
};

// lógica para eliminar un producto
const deleteProductById = async (id, user) => {
    const productData = await productsRepository.getProductById(id);
    if (user.role === "premium" && productData.owner !== user._id) {
        throw error.unauthorizedError("User not authorized to delete product")
    }
    
    const product = await productsRepository.deleteProductById(id);
    if (!product) throw error.notFoundError(`Product id:${id} not found`);

    return product;
};

export default {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
}