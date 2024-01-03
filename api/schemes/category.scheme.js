const Joi = require('joi')

/*
Se definen las características de los datos que estaremos enviando a través de las request.
*/


const id = Joi.string().uuid()
const description = Joi.string()
//const price = Joi.number().integer().min(10)
//const image = Joi.string().uri()
const isBlock = Joi.boolean()


// Se crean todos los esquemas, definiendo qué información es obligatoria o no

// Scheme de creación
const createCategoryScheme = Joi.object({
    description: description.required(),
    //price: price.required(),
    //image: image.required(),
    isBlock: isBlock.required()
})

// Scheme de actualización
const updateCategoryScheme = Joi.object({
    description: description,
    isBlock: isBlock,
})

// Scheme de consulta
const getCategoryScheme = Joi.object({
    id: id.required()
})

module.exports = {createCategoryScheme, updateCategoryScheme, getCategoryScheme}
