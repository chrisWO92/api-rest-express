/*
Este archivo usa la librería pg para crear una función que sirva para generar
una conexión con la base de datos que creamos. Tenemos que crear una instancia de
la clase Client dentro de la función y pasarle los parámetros descritos, ya que los necesita
según dice la documentación, para generar la conexión que estamos buscando.
*/

const {Client} = require('pg')

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'cristian',
    password: 'admin123',
    database: 'api_express_docker'
  })

  // Hacemos la conexión con el cliente
  await client.connect()
  // Retornamos el cliente
  return client
}

module.exports = getConnection
