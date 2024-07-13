import { productsModel } from "../models/products.model.js"; // importamos el productsModel para utilizar los modelos para interactuar con la base de datos

const getAll = async (query, optionsFilter) => { // creamos una función para traer todo
    const products = await productsModel.paginate(query, optionsFilter); // utilizamos el método paginate para traer los productos según parámetros y para obtener los datos de total de páginas, el número de página, etc.
    return products;
}

const getById = async (id) => {
    const product = productsModel.findById(id); // utilizamos el método findById para traer un elemento por id
    return product;
}

const create = async (data) => {
    const product = productsModel.create(data); // utilizamos el método create para crear un producto
    return product;
}

const update = async (id, data) => {
    await productsModel.findByIdAndUpdate(id, data); // utilizamos el método findByIdAndUpdate para actualizar el elemento primero
    const product = await productsModel.findById(id); // buscamos el elemento con la información actualizada
    return product;
}

const deleteOne = async (id) => {
    const product = await productsModel.deleteOne({_id: id}); // utilizamos el método deleteOne con un parámetro de búsqueda para eliminar el producto con el id que coincida con la propiedad id del elemento
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