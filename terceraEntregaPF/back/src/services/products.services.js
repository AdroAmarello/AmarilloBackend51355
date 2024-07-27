import { productResponseDto } from "../dto/product-response.dto.js";
import productsRepository from "../persistences/mongo/repositories/products.repository.js";

// lógica de petición de todos los productos o por un límite
const getProducts = async (query, options) => {
	const products = await productsRepository.getProducts(query, options);
    return products;
};

// lógica de petición de producto por id
const getProductById = async (id) => {
    const productData = await productsRepository.getProductById(id);
    const product = productResponseDto(productData);
    return product;
};

// lógica de carga de un nuevo producto
const createProduct = async (data) => {
	const product = await productsRepository.createProduct(data);
    return product;
};

// lógica de modificación de un producto
const updateProductById = async (id, data) => {
	const product = await productsRepository.updateProductById(id, data);
    return product;
};

// lógica para eliminar un producto
const deleteProductById = async (id) => {
	const product = await productsRepository.deleteProductById(id);
    return product;
};

export default {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
}