/* 
Este archivo crea un router para nuestra aplicación
y lo exporta. Es el router de las rutas relacionadas a 
categories
*/

const express = require('express')
const router = express.Router()
const {faker} = require('@faker-js/faker')

const CategoryServices = require('../services/category.service')
const services = new CategoryServices()

const validatorHandler = require('../middlewares/validator.handler')

const {createCategoryScheme, updateCategoryScheme, getCategoryScheme} = require('../schemes/category.scheme')

router.get('/', async (req, res) => {
    const categories = await services.find()
    res.json(categories)
})

// En el siguiente endpoint estamos obteniendo la categoría
// con un id específico
router.get('/:id',
    validatorHandler(getCategoryScheme, 'params'),
    async (req, res, next) => {
        try {
            const {id} = req.params
            const category = await services.findOne(id)
            res.json(category)
        } catch (error) {
            next(error)            
        }
})

router.post(
    '/',
    // En el segundo argumento de la petición, pasamos el validatorHandler correspondiente
    validatorHandler(createCategoryScheme, 'body'),
    async (req, res) => {
    const body = req.body
    const newCategory = await services.create(body)
    res.status(200).json(newCategory)
})

router.patch(
    '/:id',
    // En el segundo argumento de la petición, pasamos el validatorHandler correspondiente
    // Se pueden pasar varios validadores considerando que los middlewares operan en forma secuencial
    validatorHandler(getCategoryScheme, 'params'),
    validatorHandler(updateCategoryScheme, 'body'),
    async (req, res, next) => {
    // Recordemos que el método update de services arroja un error
    // si no encuentra la categoria con el index pasado como parámetro.
    // Por tanto se puede encerrar en un try catch tal como sigue:
    try {
        // En la request puede ser enviado data a través del body.
        // En la ruta debería estar el identificador
        const {id} = req.params
        const body = req.body
        const updateCategory = await services.update(id, body)
        res.json(updateCategory)

    } catch (error) {
        // Para que funcione con el error.handler
        next(error)
    }
})

router.delete('/:id', async (req, res) => {
    // La solicitud DELETE no necesita body ya que sólo quiere eliminar
    // un artículo
    const {id} = req.params
    const message = await services.delete(id)
    res.json(message)
})

module.exports = router
