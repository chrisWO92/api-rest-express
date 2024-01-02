const Joi = require('joi')

/*
Se definen las características de los datos que estaremos enviando a través de las request.
*/


const id = Joi.string().uuid()
const name = Joi.string().min(3).max(15)
const price = Joi.number().integer().min(10)
const image = Joi.string().uri()
const isBlock = Joi.boolean()


// Se crean todos los esquemas, definiendo qué información es obligatoria o no

// Scheme de creación
const createProductScheme = Joi.object({
    name: name.required(),
    price: price.required(),
    image: image.required(),
    // isBlock: isBlock.required()
})

// Scheme de actualización
const updateProductScheme = Joi.object({
    name: name,
    price: price,
    image: image,
    isBlock: isBlock,
})

// Scheme de consulta
const getProductScheme = Joi.object({
    id: id.required()
})

module.exports = {createProductScheme, updateProductScheme, getProductScheme}
