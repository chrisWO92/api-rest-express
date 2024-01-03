const Joi = require('joi')

/*
Se definen las características de los datos que estaremos enviando a través de las request.
*/


const id = Joi.string().uuid()
const name = Joi.string()
const lastName = Joi.string()
const sex = Joi.string()
const jobTitle = Joi.string()
const isBlock = Joi.boolean()


// Se crean todos los esquemas, definiendo qué información es obligatoria o no

// Scheme de creación
const createUserScheme = Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    sex: sex.required(),
    jobTitle: jobTitle.required(),
    isBlock: isBlock.required()
})

// Scheme de actualización
const updateUserScheme = Joi.object({
    name: name,
    lastName: lastName,
    sex: sex
})

// Scheme de consulta
const getUserScheme = Joi.object({
    id: id.required()
})

module.exports = {createUserScheme, updateUserScheme, getUserScheme}
