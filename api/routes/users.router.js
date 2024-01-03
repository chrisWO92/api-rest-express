/*
Este archivo crea un router para nuestra aplicación
y lo exporta. Es el router de las rutas relacionadas a
users
*/

const express = require('express')
const router = express.Router()
const {faker} = require('@faker-js/faker')

const UserServices = require('../services/users.service')
const services = new UserServices()

const validatorHandler = require('../middlewares/validator.handler')

const {createUserScheme, updateUserScheme, getUserScheme} = require('../schemes/user.scheme')

// El siguiente endpoint usa la propiedad query de request. Este sirve para obtener
// los parámetros del tipo query que se le pasen a la ruta.
// Los parámetros tipo query son aquellos que permiten hacer paginación y filtros a
// los resultados que estamos buscando obtener.
// Un ejemplo de ruta con parámetros query es el siguiente:
// /users?limit=10&offset=200
// como se observa se usa el signo ? seguido de los parámetros query, concatenados en
// este caso con & para hacer conjunción de condicionales
router.get('/', async (req, res) => {
    const users = await services.find()
    res.json(users)
    /* const {limit, offset} = req.query
    if (limit && offset) {
        res.json({
            limit,
            offset
        })
    } else {
        res.send('No hay parámetros')
    } */
})

router.get('/:id',
    validatorHandler(getUserScheme, 'params'),
    async (req, res, next) => {
        try {
            const {id} = req.params
            const user = await services.findOne(id)
            res.json(user)
        } catch (error) {
            next(error)
        }
})

router.post(
  '/',
  // En el segundo argumento de la petición, pasamos el validatorHandler correspondiente
  validatorHandler(createUserScheme, 'body'),
  async (req, res) => {
  const body = req.body
  const newCategory = await services.create(body)
  res.status(200).json(newCategory)
})

router.patch(
  '/:id',
  // En el segundo argumento de la petición, pasamos el validatorHandler correspondiente
  // Se pueden pasar varios validadores considerando que los middlewares operan en forma secuencial
  validatorHandler(getUserScheme, 'params'),
  validatorHandler(updateUserScheme, 'body'),
  async (req, res, next) => {
  // Recordemos que el método update de services arroja un error
  // si no encuentra el user con el index pasado como parámetro.
  // Por tanto se puede encerrar en un try catch tal como sigue:
  try {
      // En la request puede ser enviado data a través del body.
      // En la ruta debería estar el identificador
      const {id} = req.params
      const body = req.body
      const updateUser = await services.update(id, body)
      res.json(updateUser)

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
