import error from "../errors/customErrors.js";
import usersRepository from "../persistences/mongo/repositories/users.repository.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import { sendMail } from "../utils/sendMails.js";


const sendEmailResetPassword = async (email) => {
    const message = "Debe restablecer su password en el siguiente link https://www.google.com"; // colocar la ruta de la vista donde se restablecerá el password
    await sendMail(email, "Restablecer password", message);

    return "Email enviado";
};

const resetPassword = async (email, password) => {
    const user = await usersRepository.getUserByEmail(email);
    if (!user) throw error.notFoundError("User not found");

    const passwordIsEqual = isValidPassword(user, password);
    
    if (passwordIsEqual) throw error.badRequestError("Password already exists");

    return await usersRepository.updateUserById(user._id, { password: createHash(password) });

};

const changeUserRole = async (uid) => {
    const user = await usersRepository.getUserById(uid);
    if (!user) throw error.notFoundError("User not found");
    const userRole = user.role === "premium" ? "user" : "premium";

    return await usersRepository.update(uid, { role: userRole });
};

export default { sendEmailResetPassword, resetPassword, changeUserRole};