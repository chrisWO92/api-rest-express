/*
En este index estará la configuración inicial de nuestro sequelize
con nuestros modelos
*/

// Este archivo tendrá el setup de todos nuestros modelos

const {UserSchema, User} = require('./user.model')
const {ProductSchema, Product} = require('./product.model')
// const {UserSchema, User} = require('./user.model')
// const {UserSchema, User} = require('./user.model')
// const {UserSchema, User} = require('./user.model')
// Así se listarían todos los modelos

function setupModels (sequelize) {
    // Iniciamoss el modelo User, y le pasamos el esquema e invocamos el
    // método config() que sirve para retornar parámetros de configuración
    User.init(UserSchema, User.config(sequelize))
    Product.init(ProductSchema, Product.config(sequelize))
    // User.init(UserSchema, User.config(sequelize))
    // User.init(UserSchema, User.config(sequelize))
    // User.init(UserSchema, User.config(sequelize))
    // Así se configurarían dentro de setupModels
}

module.exports = setupModels
