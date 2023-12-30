/* 
Este archivo crea un router para nuestra aplicación
y lo exporta. Es el router de las rutas relacionadas a 
users
*/

const express = require('express')
const router = express.Router()
// const {faker} = require('@faker-js/faker')

// El siguiente endpoint usa la propiedad query de request. Este sirve para obtener
// los parámetros del tipo query que se le pasen a la ruta.
// Los parámetros tipo query son aquellos que permiten hacer paginación y filtros a
// los resultados que estamos buscando obtener.
// Un ejemplo de ruta con parámetros query es el siguiente:
// /users?limit=10&offset=200
// como se observa se usa el signo ? seguido de los parámetros query, concatenados en
// este caso con & para hacer conjunción de condicionales
router.get('/', (req, res) => {
    const {limit, offset} = req.query
    if (limit && offset) {
        res.json({
            limit,
            offset
        })
    } else {
        res.send('No hay parámetros')
    }
})

module.exports = router