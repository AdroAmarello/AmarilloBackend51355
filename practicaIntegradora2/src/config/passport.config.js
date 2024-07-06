// Creamos configuración de estrategias de Passport (generador de estrategias de autenticación)
import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import usersDao from "../dao/mongoDao/users.dao.js";
import usersServices from "../services/users.services.js";
import accountsServices from "../services/accounts.services.js";
import { cookieExtractor } from "../utils/cookieExtractor.js";

const LocalStrategy = local.Strategy // designamos la estrategia de passport-local
const JWTStrategy = jwt.Strategy // designamos la estrategia de passport-jwt
const ExtractJWT = jwt.ExtractJwt;

// Lógica para inicializar todas las estrategias que configuremos
const initializePassport =() => {
    // utilizamos middleware de passport
    passport.use( // le damos un nombre a la estrategia con un string y luego creamos una nueva instancia de LocalStrategy con un objeto de configuración 
        "register",
        new LocalStrategy ({passReqToCallback: true, usernameField: "email" },
            async (req, username, password, done) => {
                try {
                    
                    const { name, lastName } = req.body; // tomamos la data del user desde el body
                    const user = await usersServices.getOneUser({ email: username}); // buscamos con la query el email del usuario
                    if (user) return done(null, false, {message: "El usuario ya existe"}) // si existe nos informa que ya existe y en el segundo parámetro establecemos el valor en false para que no cree un nuevo usuario

                    const accountUser = await accountsServices.createAccount({ name, lastName }); 
                    //si no existe el usuario 
                    const newUser = { // creamos un objeto para controlar la información que recibimos
                        name,
                        lastName,
                        email: username,
                        password: createHash(password), // aquí invocamos a la función de Encriptar contraseña y le pasamos al contraseña del body
                        account: accountUser._id
                    }

                    const createUser= await usersServices.registerUser(newUser); // se utilizan los datos de "newUser" para crear un nuevo usuario
                    
                    await accountsServices.updateAccount(accountUser._id, { userId: createUser._id }); // actualizamos la cuenta con el 

                    return done(null, createUser) // en el segundo parámetro se pasa el "createUser"

                } catch (error) {
                    return done(error);
                    
                }
            } // factorizamos la información del usuario para quitarle responsabilidad a las rutas y le pasamos a Passport toda esta información para que la maneje de manera global en nuestro proyecto
        ));

    passport.use( // se crea la estrategia para el login, no hace falta permitirle a Passport acceder al objeto "request", sólo asignamos el "email" como "usernameField"
        "login",
        new LocalStrategy({ usernameField: "email"},
        async (username, password, done) =>{
            try {
                
                const user = await usersServices.getOneUser({email: username}); // buscamos por email el usuario
                if(!user || !isValidPassword(user, password)) return done(null, false, {message: "Usuario o contraseña no válidos"});
                // Si los datos son válidos
                return done(null, user);

            } catch (error) {
                done(error)
                
            }
        })
    );

    passport.use( // se crea la estrategia de jwt
        "jwt",
        new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: "codigoSecreto",
        },
        async (jwt_payload, done) => {
            
            try {
                return done(null, jwt_payload);
            } catch (error) {
                return done(error);
            }
        }
        )
    );

    // Serialización y deserialización de usuarios
    passport.serializeUser((user, done) => { // pasamos el usuario y en done pasamos el id del usuario
        done(null, user._id);
    });

    passport.deserializeUser( async (id, done) => { // pasamos una función asíncrona con dos parámetros, un id para buscar al usuario y pasarlo en la función de callback "done"
        try {
            const user = await usersServices.getOneUser({_id: id});
            done(null, user);
            
        } catch (error) {
            done(error);
        }
    })
}

export default initializePassport;