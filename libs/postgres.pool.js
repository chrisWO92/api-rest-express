/*
Este otro archivo usa la librería pg para crear una función que sirva para generar
un pool de conexiones con la base de datos que creamos. Tenemos que crear una instancia de
la clase Pool pasarle los parámetros descritos, ya que los necesita
según dice la documentación.

Recordemos que un pool de conexiones permite que nuestra aplicación no cree una nueva conexión
a la DB cada vez que queremos acceder a la misma.
*/

const {Pool} = require('pg')

const {config} = require('../config/config')

/* Usando Variables de Entorno para la conexón con DB */

// Encodeamos las variables más importantes:
const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)

// Se crea la URL de conexión. Normalmente esta es la manera correcta de conectarse a una DB
// El protocolo para conectarse a postgres es como sigue:
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

// Creamosla instancia de Pool y en lugar de pasarle un objeto con todas las variables,
// le pasamos la url que creamos como un 'conecctionString'.
// Esto hace lo mismo que habíamos hecho antes, pero de una manera más segura.
const pool = new Pool({connectionString: URI})


// Antes de usar las variables de entorno, se hacía la pool de conexiones de esta manera
/* const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'cristian',
  password: 'admin123',
  database: 'api_express_docker'
}) */


module.exports = pool
