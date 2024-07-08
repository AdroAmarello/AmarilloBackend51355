import { Router } from "express";
import passport from "passport";
import movementsServices from "../services/movements.services.js";

const router = Router();

//creamos solicitud/peticiones
router.get("/user/:uid", movementsUser); // Creamos endpoint para ver los movimientos del usuario

//Configuramos callbacks
//Lógica de movimientos del usuario
async function movementsUser(req, res) {
    try {
        
        const { uid } = req.params;
        const movements = await movementsServices.getMovementsUser({userId: uid});

        res.status(200).json({status: "success", movements });
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({status: 'error', message: "Error interno del servidor"});
    }
}

export default router;

