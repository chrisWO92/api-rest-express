/*
Se define un middleware para la validación de los datos enviados por request, usando el esquema
de la carpeta 'schemes'.

En este caso, el middleware de define como un closure de la función validatorHandler,
que recibe como parámetros al esquema que queremos usar y a la propiedad sobre la cual
queremos usar el esquema para validar el formato de los datos.

Se hace de esta manera para poder pasarle el esquema y la propiedad de manera dinámica al
middleware interno.

Esta es la manera de crear un MIDDLEWARE DINÁMICO.
*/

const boom = require('@hapi/boom')

function validatorHandler (scheme, property) {
    return (req, res, next) => {
        /*
        Se obtienen los datos que se quieren comprobar, que pueden venir de:
            - req.params
            - req.body
            - req.query
        */
        const data = req[property]

        // Se obtiene el posible error en caso que el schema detecte alguno
        // Se indica aborEarly: false para que nos muestre todos los errores que encuentre,
        // ya que de lo contrario mostraría uno por uno. Es decir, nos muestra el primero que
        // encuentra, lo corregimos, y recién ahí muestra el segundo error que encuentre, y así
        // sucesivamente en la medida que vamos corrigiendo los errores.
        // De esta manera los muestra todos de una vez.
        const {error} = scheme.validate(data, {abortEarly: false})

        // Si ocurrió un error, se envía un error de tipo boom para que los
        // middlewares de tipo error los capturen.
        if (error) {
            next(boom.badRequest(error))
        }

        // Si no ocurre un error, se ejecuta el resto de la aplicación
        next()
    }
}

module.exports = validatorHandler
