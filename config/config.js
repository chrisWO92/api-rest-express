// Para cargar variables de entorno del .env en el proceso de Node
require('dotenv').config()

const config = {
  // Si no hay un NODE_ENV, definir que estamos en development por default
  env: process.env.NODE_ENV || 'dev',
  // Si hacemos deploy en Heroku, este nos define el puerto. Si no está definido, usar el puerto 3000
  port: process.env.PORT || 3000,

  /* Ahora se definen todas las variables necesarias para la conexión con la base de datos */
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
}

module.exports = {config}
