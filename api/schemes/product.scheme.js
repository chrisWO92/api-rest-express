const Joi = require('joi')

/*
Se definen las características de los datos que estaremos enviando a través de las request.
*/


const id = Joi.number().integer()
const name = Joi.string()
const price = Joi.number().integer().min(10)
const image = Joi.string()
const description = Joi.string().min(10)
const isBlock = Joi.boolean()

// Necesitamos que al crear el producto el usuario
// nos envíe la categoría
const categoryId = Joi.number().integer()

const limit = Joi.number().integer()
const offset = Joi.number().integer()




// Se crean todos los esquemas, definiendo qué información es obligatoria o no

// Scheme de creación
const createProductScheme = Joi.object({
    name: name.required(),
    price: price.required(),
    image: image.required(),
    description: description.required(),
    //isBlock: isBlock.required()

    // Categoría requerida
    categoryId: categoryId.required()
})

// Scheme de actualización
const updateProductScheme = Joi.object({
    name: name,
    price: price,
    image: image,
    description: description,
    categoryId: categoryId
    //isBlock: isBlock,
})

// Scheme de consulta
const getProductScheme = Joi.object({
    id: id.required()
})

const queryProductScheme = Joi.object({
    limit,
    offset,
    price
})

module.exports = {createProductScheme, updateProductScheme, getProductScheme, queryProductScheme}
