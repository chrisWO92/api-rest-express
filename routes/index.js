/* 
Importa el products.router y se lo pasa como parámetro a 
app.use(). Lo qu hace esto es tomar todas las rutas relacionadas
a productos y las enrutará en la aplicación, de manera que podamos
acceder a su información a través del navegador
*/

const express = require('express')

const productosRouter = require('./productos.router')
const usersRouter = require('./users.router')
const categoriesRouter = require('./categories.router')

function routerApi(app) {
    // Se crea un enrutador y se le pasa como parámetro a app.use().
    // El primer parámetro de app.use() es la ruta en la que queremos
    // guardar esta versión de la api: /api/v1/.
    // Es decir, la guardamos como versión 1 de la api.
    const router = express.Router()
    app.use('/api/v1/', router)
    router.use('/productos', productosRouter)
    router.use('/users', usersRouter)
    router.use('/categories', categoriesRouter)

}

module.exports = routerApi