// Importamos el método ValidationError de sequelize que permite detectar si un
// error viene del ORM
const {ValidationError} = require('sequelize')

/* Middleware de tipo error: son aquellos que invocan a next
con el error como parámetro de la misma. Los errores se gestionan
en este tipo de middlewares y se transfieren a otras estancias
de la aplicación.
Este middleware loguea el error. */
function logErrors (err, req, res, next) {
    console.log('logErrors')
    console.error(err)
    next(err)
}

/* Este otro middleware también es del tipo error pero
no sirve para loguear sino para darle un formato al error.
Vease que este middleware no ejecuta next y sin embargo se le
pasa como parámetro. Esto es porque definir next como cuarto
parámetro es necesario para que la aplicación identifique
que queremos gestionar esta función como un middleware. */
function errorHandler (err, req, res, next) {
    console.log('errorHandler')
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
}

/*
Middleware para determinar si un error es detectado por la librería boom.
Si no es así, le pasa el error al siguiente middleware.
*/
function boomErrorHandler (err, req, res, next) {
    console.log('boomErrorHandler')
    // El error trae una propiedad "isBoom" que es true cuando el error es de tipo boom
    if (err.isBoom) {
        // El error trae una propiedad "output"
        const {output} = err
        // output trae definido el tipo de error en la propiedad "statusCode"
        // y trae el mensaje del error en "payload"
        res.status(output.statusCode).json(output.payload)
    } else {
        // Si el error no es de tipo boom, se ejecutan los otros middlewares,
        // en este caso sería el errorHandler()
        next(err)
    }
}

/*
El siguiente middleware permite detectar si un error tiene origen en el modelo ORM.
Por ejemplo, el poner varios usuarios con el mismo email generará un error que será
detectado por este middleware.
*/
function ormErrorHandler (err, req, res, next) {
  console.log('ormErrorHandler')
  // El error es una instancia de ValidationError de sequelize?
  if (err instanceof ValidationError) {
    // Si lo es, formatee el error de la siguiente manera
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    })
  }
  // Si no, siga y maneje el error con el siguiente middleware
  next(err)
}

module.exports = {logErrors, errorHandler, boomErrorHandler, ormErrorHandler}
