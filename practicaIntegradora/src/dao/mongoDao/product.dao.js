import { productModel } from "../models/product.model.js"; // importamos el productModel para utilizar los modelos para interactuar con la base de datos

const getAll = async () => { // creamos una función para traer todo
    const products = await productModel.find(); // utilizamos el método find para traer todos los productos
    return products;
}

const getById = async (id) => {
    const product = productModel.findById(id); // utilizamos el método findById para traer un elemento por id
    return product;
}

const create = async (data) => {
    const product = productModel.create(data); // utilizamos el método create para crear un producto
    return product;
}

const update = async (id, data) => {
    await productModel.findByIdAndUpdate(id, data); // utilizamos el método findByIdAndUpdate para actualizar el elemento primero
    const product = await productModel.findById(id); // buscamos el elemento con la información actualizada
    return product;
}

const deleteOne = async (id) => {
    const product = await productModel.deleteOne({_id: id}); // utilizamos el método deleteOne con un parámetro de búsqueda para eliminar el producto con el id que coincida con la propiedad id del elemento
    if(product.deletedCount === 0) return false; // comprobamos si se efectuó la eliminación del producto.
    return true; // sólo devolvemos un true porque no me interesa que me retorne el elemento eliminado
}

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne
}