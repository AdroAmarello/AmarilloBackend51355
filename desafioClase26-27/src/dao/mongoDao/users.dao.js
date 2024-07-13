import { usersModel } from "../models/users.model.js"; // importamos el usersModel para utilizar los modelos para interactuar con la base de datos 
//tomamos el CRUD del products.dao.js

const getAll = async () => { // creamos una función para traer todo
    const users = await usersModel.find()
    return users;
}

const getById = async (id) => {
    const user = usersModel.findById(id); // utilizamos el método findById para traer un elemento por id
    return user;
}

const getByEmail = async (email) => {
    const user = usersModel.findOne({email}); // utilizamos el método findOne para buscar elemento y le ponemos como condición el email
    return user;
}

const create = async (data) => {
    const user = usersModel.create(data); // utilizamos el método create para crear un usuario
    return user;
}

const update = async (id, data) => {
    await usersModel.findByIdAndUpdate(id, data); // utilizamos el método findByIdAndUpdate para actualizar el elemento primero
    const user = await usersModel.findById(id); // buscamos el elemento con la información actualizada
    return user;
}

const deleteOne = async (id) => {
    const user = await usersModel.deleteOne({_id: id}); // utilizamos el método deleteOne con un parámetro de búsqueda para eliminar el user con el id que coincida con la propiedad id del elemento
    if(user.deletedCount === 0) return false; // comprobamos si se efectuó la eliminación del user.
    return true; // sólo devolvemos un true porque no me interesa que me retorne el elemento eliminado
}

export default {
    getAll,
    getById,
    getByEmail,
    create,
    update,
    deleteOne
}