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

router.get('/', (req, res) => {
    const categories = services.find()
    res.json(categories)
})

// En el siguiente endpoint estamos obteniendo la categoría
// con un id específico
router.get('/:id', (req, res) => {
    const {id} = req.params
    const category = services.findOne(id)
    res.json(category)
})

module.exports = router
