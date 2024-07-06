import { Router } from "express";
import accountsServices from "../services/accounts.services.js";
import passport from "passport";

const router = Router();

//creamos solicitud/peticiones
router.put("/deposit", passport.authenticate("jwt", { session: true }), depositAccount); // Creamos endpoint para depósitos
router.put("/extract", passport.authenticate("jwt", { session: true }), extractAccount); // Creamos endpoint para extracciones
router.put("/transfer", passport.authenticate("jwt", { session: true }), transferBalance); // Creamos endpoint para transferencias

//Configuramos callbacks
//lógica de depósitos
async function depositAccount(req, res) {
    try {
        const { amount, alias, number, description } = req.body; // tomamos los datos del body
        const queryAccount = alias ? { alias } : { number } // creamos un query con un operador ternario dependiendo del dato que reciba
        const findAccount = await accountsServices.getOneAccount(queryAccount); // buscamos la cuenta por la query

        if (!findAccount) return res.status(404).json({status: "error", message: "Cuenta no encontrada"}); // validamos que exista la cuenta

        const account = await accountsServices.depositAccount(queryAccount, amount, description);
        
        res.status(200).json({status: "success", account })
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({status: 'error', message: "Error interno del servidor"});
    }

}
//lógica de extracción
async function extractAccount(req, res) {
    try {
        const { amount, alias, number } = req.body; // tomamos los datos del body
        const queryAccount = alias ? { alias } : { number } // creamos un query con un operador ternario dependiendo del dato que reciba
        const findAccount = await accountsServices.getOneAccount(queryAccount); // buscamos la cuenta por la query

        if (!findAccount) return res.status(404).json({status: "error", message: "Cuenta no encontrada"}); // validamos que exista la cuenta

        if (findAccount.balance < amount ) return res.status(400).json({status: "error", message: "Saldo insuficiente para la extracción"}) // validamos que el monto que se quiere extraer sea menor al que posee la cuenta en "balance"

        const account = await accountsServices.extractAccount(queryAccount, amount);
        
        res.status(200).json({status: "success", account })
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({status: 'error', message: "Error interno del servidor"});
    }
};

//lógica de transferencias
async function transferBalance(req, res) {
    try {
        const { amount, alias, number, description } = req.body; // tomamos los datos del body

        const user = req.user; // tomamos del req.user los datos del usuario

        const queryAccount = alias ? { alias } : { number };// creamos un query con un operador ternario dependiendo del dato que reciba

        const originAccount = await accountsServices.getOneAccount({ userId: user._id}) // buscamos la cuenta de origen con el id que tenemos en req.user

        const destinationAccount = await accountsServices.getOneAccount(queryAccount); // buscamos la cuenta por la query
        
        if (!destinationAccount || !originAccount) return res.status(404).json({status: "error", message: "Cuenta no encontrada"}); // validamos que exista la cuenta

        if (originAccount.balance < amount ) return res.status(400).json({status: "error", message: "Saldo insuficiente para la operación"}) // validamos que el monto que se quiere transferir sea menor al que posee la cuenta en "balance"

        const account = await accountsServices.transferBalance({alias: originAccount.alias}, queryAccount, amount, description);
        
        res.status(200).json({status: "success", account })
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({status: 'error', message: "Error interno del servidor"});
    }

};

export default router;