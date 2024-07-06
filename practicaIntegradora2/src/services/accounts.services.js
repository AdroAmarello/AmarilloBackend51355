import accountDao from "../dao/mongoDao/accounts.dao.js"; //Creamos el servicio con la lógica de negocio de las cuentas
import movementsDao from "../dao/mongoDao/movements.dao.js"; //Llamamos a la capa de servicio para que interactúe con la base de datos

const getOneAccount = async (query) => { // creamos servicio para obtener una cuenta por query
	return await accountDao.getOne(query);
}

const createAccount = async (userData) => {
	const { name, lastName, _id = null } = userData; // desestructuramos los datos del usuario y asignamos null al "_id"
	const accountNumber = Math.floor(Math.random() * 1000000000); // creamos un número de cuenta aleatorio y asignamos la cantidad de caracteres
	const alias = `${name.toLowerCase()}.${lastName.toLowerCase()}.${accountNumber.toString().slice(-4)}`; // creamos un alias a partir del "name" del "lastName" y del "accountNumber" reducido.
	const accountData = {
		alias,
		number: accountNumber.toString(),
		userId: _id,
	}; // creamos un objeto con los datos de la cuenta

	return await accountDao.create(accountData);
};

const updateAccount = async (accountId, accountData) => { // creamos función para actualizar la cuenta creada con un id
	return await accountDao.update(accountId, accountData)
};

const depositAccount = async (query, amount, description) => {
	const account = await accountDao.getOne(query); // buscamos la cuenta por una query que puede ser id de cuenta o nombre de usuario
	await movementsDao.create({amount, type: 'deposit', originAccountId: account._id, userId: account._id, description}) // usamos el "movementsDao" para crear un movimiento con la info recibida por parámetro
	return accountDao.update(account._id, {balance: account.balance + amount}) // actualizamos el "balance" de la cuenta con el número que tenía esa propiedad más el "amount" ingresado
};

const extractAccount = async (query, amount) => {
	const account = await accountDao.getOne(query); // buscamos la cuenta por una query que puede ser id de cuenta o nombre de usuario
	await movementsDao.create({ amount: amount * -1, type: 'extract', originAccountId: account._id, userId: account._id}); // usamos el "movementsDao" para crear un movimiento con la info recibida por parámetro
	return accountDao.update(account._id, {balance: account.balance - amount}) // actualizamos el "balance" de la cuenta con el número que tenía esa propiedad menos el "amount" ingresado
};

const transferBalance = async (originQuery, destinationQuery , amount, description) => {
	const originAccount = await accountDao.getOne(originQuery); // buscamos la cuenta de origen
	const destinationAccount = await accountDao.getOne(destinationQuery); // buscamos la cuenta destino 

	await movementsDao.create({ // creamos el movimiento de transferencia de la cuenta de origen multiplicando el "amount" * -1
		amount: amount * -1, 
		type: 'transfer', 
		userId: originAccount.userId, 
		originAccountId: originAccount._id, 
		destinationAccountId: destinationAccount._id,
		description
	});
	await movementsDao.create({ // creamos el movimiento de transferencia de la cuenta destino poniendo el "amount" en positivo
		amount: amount, 
		type: 'transfer', 
		userId: destinationAccount.userId, 
		originAccountId: originAccount._id, 
		destinationAccountId: destinationAccount._id,
		description
	});
	const originAccountUpdate = await accountDao.update(originAccount._id, { balance: originAccount.balance - amount}); // actualizamos la cuenta que envía dinero
	const destinationAccountUpdate = await accountDao.update(destinationAccount._id, { balance: destinationAccount.balance + amount}); // actualizamos la cuenta que recibe dinero
	return { originAccountUpdate, destinationAccountUpdate};

};

export default {
	getOneAccount,
    createAccount,
	updateAccount,
	depositAccount,
	extractAccount,
	transferBalance,
};
