import { movementsModel } from "../models/movements.model.js"; // importamos el movementsModel para utilizar los modelos para interactuar con la base de datos 

const getAll = async (query) => { // creamos una función para traer todo, en caso de tener un query se lo pasamos por parámetro para filtrar
    return await movementsModel.find(query);
}

const getOne = async (query) => {
    return await movementsModel.findOne(query); // utilizamos el método findOne para buscar un movimiento y como query puede tener cualquier parámetro
}

const create = async (data) => { // creamos un movimiento nuevo
    return await movementsModel.create(data);
}

const update = async (id, data) => {
    return await movementsModel.findByIdAndUpdate(id, data, {new: true}); // utilizamos el método findByIdAndUpdate para actualizar el elemento, modificamos la data y con "{new: true}" devolvemos el elemento actualizado
}

const deleteOne = async (id) => {
    return await movementsModel.deleteOne({_id: id}); // utilizamos el método deleteOne con un parámetro de búsqueda para eliminar el user con el id que coincida con la propiedad id del elemento
}

export default {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}