const Joi = require('joi')

/*
Se definen las características de los datos que estaremos enviando a través de las request.
*/


const id = Joi.number().integer()
const email = Joi.string()
const password = Joi.string()
// const createdAt = Joi.string()


// Se crean todos los esquemas, definiendo qué información es obligatoria o no

// Scheme de creación
const createUserScheme = Joi.object({
    email: email.required(),
    password: password.required(),
    // createdAt: createdAt.required(),
})

// Scheme de actualización
const updateUserScheme = Joi.object({
    email: email,
    password: password,
    // createdAt: createdAt
})

// Scheme de consulta
const getUserScheme = Joi.object({
    id: id.required()
})

module.exports = {createUserScheme, updateUserScheme, getUserScheme}
