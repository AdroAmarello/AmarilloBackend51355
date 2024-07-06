import { usersModel } from "../models/users.model.js"; // importamos el usersModel para utilizar los modelos para interactuar con la base de datos 

const getAll = async (query) => { // creamos una función para traer todo, en caso de tener un query se lo pasamos por parámetro para filtrar
    return await usersModel.find(query);
}

const getOne = async (query) => {
    return await usersModel.findOne(query); // utilizamos el método findOne para buscar un usuario y como query puede tener cualquier parámetro
}

const create = async (data) => {
    return await usersModel.create(data); // utilizamos el método create para crear un usuario
}

const update = async (id, data) => {
    return await usersModel.findByIdAndUpdate(id, data, {new: true}); // utilizamos el método findByIdAndUpdate para actualizar el elemento, modificamos la data y con "{new: true}" devolvemos el elemento actualizado
}

const deleteOne = async (id) => {
    return await usersModel.deleteOne({_id: id}); // utilizamos el método deleteOne con un parámetro de búsqueda para eliminar el user con el id que coincida con la propiedad id del elemento
}

export default {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}