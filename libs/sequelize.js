const {Sequelize} = require('sequelize')

const {config} = require('../config/config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

// Se crea una instancia de Sequilize y se le pasa la URI de esta manera. 
// Esta librería va a gestionar la conexión por nosotros sólo pasansole este parámetro,
// A diferencia con el pool que había que indicarle qué tipo de parámetro era
// como un par llave-valor
const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: true,
})

module.exports = sequelize