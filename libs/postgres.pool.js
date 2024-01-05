/*
Este otro archivo usa la librería pg para crear una función que sirva para generar
un pool de conexiones con la base de datos que creamos. Tenemos que crear una instancia de
la clase Pool pasarle los parámetros descritos, ya que los necesita
según dice la documentación.

Recordemos que un pool de conexiones permite que nuestra aplicación no cree una nueva conexión
a la DB cada vez que queremos acceder a la misma.
*/

const {Pool} = require('pg')

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'cristian',
  password: 'admin123',
  database: 'api_express_docker'
})


module.exports = pool
