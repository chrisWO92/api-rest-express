// creo un servidor con express
const express = require('express')
const app = express();
const port = 3000;

// Se importa el enrutador
const routerApi = require('./routes')

// Se importan los middlewares para gestionar errores de la aplicación
const {logErrors, boomErrorHandler, errorHandler} = require('./middlewares/error.handler')

// Se activa el middleware que permite recibir data
// a través de una request de tipo POST.
app.use(express.json())

// invoco a la dependencia faker.
// Recordar que se instaló la versión 5.5.3 de faker ya que la última
// que es la 6.6.6 tiene un problema de seguridad y dejó de ser
// soportada por la comunidad.
// faker se instala con npm i @faker-js/faker y e invoca de la siguiente
// manera:
const {faker} = require('@faker-js/faker')

//cualquier petición siempre tiene un req y un res como parámetro en su callback
app.get('/', (req, res) => {
    res.send('Hola mi server en express')
})

app.get('/nueva-ruta', (req, res) => {
    res.send('Hola soy un nuevo endpoint')
})

//se puede enviar cualquier tipo de dato a través de la respuesta
//de la petición
//el tipo de dato que más vamos a tratar en estas peticiones es el formato
//json

//se comenta para poblar los productos con faker
/* app.get('/productos', (req, res) => {
    res.json([
        {
            name: 'Product 1',
            price: 1000        
        },
        {
            name: 'Product 2',
            price: 1500        
        },
    ])
}) */

// se le pasa la aplicación como parámetro al enrutador
routerApi(app)

// Se usa app.use() para poner en funcionamiento los middlewares. 
// Es importante que los declaremos en el orden en que queremos que se ejecuten
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

//tenemos que decirle a la aplicación que escuche eventos en un puerto en particular, 
//en este caso el 3000
app.listen(port, () => {
    console.log('Mi puerto es: ', port)
})

