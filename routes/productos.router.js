/*
Este archivo crea un router para nuestra aplicación
y lo exporta. Es el router para todas las rutas relacionadas
a productos
*/

const express = require('express')
const router = express.Router()
const {faker} = require('@faker-js/faker')

// Invocamos el ProductServices y creamos una instancia.
// Esto permite generarun array de artículos que se mantendrá
// en la memoria del navegador sin modificarse, ya que hace parte
// de una instancia de una clase.
const ProductServices = require('./../services/product.service')
const services = new ProductServices()

// Invocamos el middleware creado con el closure que detecta errores en el formato de los datos
const validatorHandler = require('../middlewares/validator.handler')
// Se incovan los esquemas de validación de datos creados con Joi
const {
  createProductScheme,
  updateProductScheme,
  getProductScheme
} = require('../schemes/product.scheme')


// Se usa faker para poblar con productos falsos aleatorios.
// Se usa async y await para indicar que la respuesta no se obtiene
// inmediatamente.
router.get('/', async (req, res) => {
    // Se usa el método find() de services para obtener el array de artículos
    const productos = await services.find()
    res.json(productos)
})

// todos los endpoints estáticos deben ir antes de los dinámicos,
// en caso contrario tendremos conflictos
router.get('/filter', (req, res) => {
    // si ponemos este endpoint luego del /productos/:id
    // nos tomará /filter como si fuera un id
    res.send('Esto es un filter')
})

// El siguiente endpoint sirve para obtener un producto en particular
// con un id específico. Para obtener el parámetro :id podemos acceder a él
// a través de la propiedad params del express.request, y destructurarlo de la
// siguiente manera:
router.get(
    '/:id',
    // En el segundo argumento de la petición, pasamos el validatorHandler correspondiente
    validatorHandler(getProductScheme, 'params'),
    async (req, res, next) => {
    // Antes esta petición no tenía next, pero se le agregó porque se
    // está haciendo crashear a propósito la función findOne() de products.router.
    // La idea aquí es que al detectar el error en findOne() se use la función next
    // para activar los dos middlewares logErrors y errorHandler, secuencialmente.
    try {
        const { id } = req.params
        // Se usa el método findOne() de services para encontrar el artículo
        // con el id pasado como parámetro en la ruta
        const item = await services.findOne(id)
        res.json(item)
        /* if (id === '999'){
            // http.cat es una página para ver los tipos de status code
            res.status(404).json({
                message: 'not found'
            })
        } else {
            res.status(200).json([
                {
                    id,
                    name: 'Product 2',
                    price: 1500
                },
            ])
        } */
    } catch (error) {
        next(error)
    }

})

// Request de tipo POST para modificar la información disponible.
// En este caso se reemplaza la información de los productos con
// un nuevo objeto de productos enviado a través de Insomnia en la
// petición POST
router.post(
    '/',
    // En el segundo argumento de la petición, pasamos el validatorHandler correspondiente
    validatorHandler(createProductScheme, 'body'),
    async (req, res) => {
    const body = req.body
    const newProduct = await services.create(body)
    res.status(200).json(newProduct)
})

// Con el siguiente endpoint podemos modificar el nombre del artículo 1212
// y mandarle data que será usado en la actualización.
// PUT se usa normalmente cuando queremos cambiar todos los atributos del
// artículo a cambiar, pero en realidad es por convención, porque si le
// pasamos menos atributos igual funcionaría con PUT.
router.patch(
    '/:id',
    // En el segundo argumento de la petición, pasamos el validatorHandler correspondiente
    // Se pueden pasar varios validadores considerando que los middlewares operan en forma secuencial
    validatorHandler(getProductScheme, 'params'),
    validatorHandler(updateProductScheme, 'body'),
    async (req, res, next) => {
    // Recordemos que el método update de services arroja un error
    // si no encuentra el artículo con el index pasado como parámetro.
    // Por tanto se puede encerrar en un try catch tal como sigue:
    try {
        // En la request puede ser enviado data a través del body.
        // En la ruta debería estar el identificador
        const {id} = req.params
        const body = req.body
        const updateProduct = await services.update(id, body)
        res.json(updateProduct)

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

/*
En los endpoints anteriores hemos configurado lo que comúmenete se llama
un CRUD = Create Read Update Delete. Hemos usado POST para crear un nuevo producto
o productos, hemos usado GET para obtener datos y leerlos, PATCH y PUT para actualizar
datos y hemos usado DELETE para eliminar artículos.
*/

module.exports = router
