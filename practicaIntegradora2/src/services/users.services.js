// Creamos la capa de servicios que se va a comunicar con nuestro dao y va a contener toda la lógica de negocio de nuestra aplicación
import usersDao from "../dao/mongoDao/users.dao.js";

const registerUser = async (userData) => { // creamos una nueva capa para registrar el usuario
    return await usersDao.create(userData);
};

const getOneUser = async (query) => {
    return await usersDao.getOne(query);
}

export default {
    registerUser,
    getOneUser,
}