// Creamos la capa de servicios de los movimientos del usuario
import movementsDao from "../dao/mongoDao/movements.dao.js";

const getMovementsUser = async (query) => {
    return await movementsDao.getAll(query);
};

export default { getMovementsUser };