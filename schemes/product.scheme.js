const Joi = require('joi')

/* 
Se definen las características de los datos que estaremos enviando a través de las request.
*/


const id = Joi.string().uuid()
const name = Joi.string().alphanum().min(3).max(15)
const price = Joi.number().integer().min(10)

// Se crean todos los esquemas, definiendo qué información es obligatoria o no

// Scheme de creación
const createProductScheme = Joi.object({
    name: name.required(),
    price: price.required(),
})

// Scheme de actualización
const updateProductScheme = Joi.object({
    name: name,
    price: price,
})

// Scheme de consulta
const getProductScheme = Joi.object({
    id: id.required()
})

module.exports = {createProductScheme, updateProductScheme, getProductScheme}