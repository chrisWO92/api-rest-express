/*
En este index estará la configuración inicial de nuestro sequelize
con nuestros modelos
*/

// Este archivo tendrá el setup de todos nuestros modelos

const {UserSchema, User} = require('./user.model')
const {ProductSchema, Product} = require('./product.model')
const {CategorySchema, Category} = require('./category.model')
const {Customer, CustomerSchema} = require('./customer.model')
const {Order, OrderSchema} = require('./order.model')



// const {UserSchema, User} = require('./user.model')
// const {UserSchema, User} = require('./user.model')
// const {UserSchema, User} = require('./user.model')
// Así se listarían todos los modelos

function setupModels (sequelize) {
    // Iniciamoss el modelo User, y le pasamos el esquema e invocamos el
    // método config() que sirve para retornar parámetros de configuración
    User.init(UserSchema, User.config(sequelize))
    Product.init(ProductSchema, Product.config(sequelize))
    Category.init(CategorySchema, Category.config(sequelize))
    Customer.init(CustomerSchema, Customer.config(sequelize))
    Order.init(OrderSchema, Order.config(sequelize))


    // User.init(UserSchema, User.config(sequelize))
    // User.init(UserSchema, User.config(sequelize))
    // Así se configurarían dentro de setupModels

    // Luego de hacer los init, tenemos que dar la
    // siguiente instrucción para que sequelize sepa
    // que queremos que Customer tenga una relación

    // También indicamos que queremos hacer asociación
    //  con User para resolver la relación bidireccional
    User.associate(sequelize.models)
    Customer.associate(sequelize.models)

    Category.associate(sequelize.models)
    Product.associate(sequelize.models)
    Order.associate(sequelize.models)




}

module.exports = setupModels
