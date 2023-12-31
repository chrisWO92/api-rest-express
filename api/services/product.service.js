/*
Este archivo es un servicio que proveerá de información y funcones a las rutas.
Se crea para tener la lógica de negocio en este lugar y no en los router.get() de
los archivos de enturamiento, siguiendo el principio de SINGLE RESPONSABILITIES.
Es decir, los endpoints del CRUD que habíamos definido en los archivos de /routes se alimentarán
de esta clase para crear, leer, actualizar y eliminar datos.
*/

const {faker} = require('@faker-js/faker')

// Importamos el manejador de errores
const boom = require('@hapi/boom')

// Importamos el pool de conexiones
// const pool = require('../../libs/postgres.pool')

// importamos sequilize que reemplazará a pool
// const sequelize = require('../../libs/sequelize')

// importamos modelos de libs/sequelize.
// Al ejecutar setupModels(sequelize) y sequelize.sync(),
// Se genera models dentro del sequilize exportado en este archivo
const {models} = require('../../libs/sequelize')


class ProductServices {

    constructor() {
        // Definimos un array products vacío para luego poblar con generate()
        this.products = []

        // La siguiente línea permite generar todos los artículos de la tienda
        // y que se mantengan en la memoria del navegador, por lo menos hasta que se refresque el navegador.
        // Esto permite a su vez manipular el mismo array desde Insomnia.
        // this.generate()

        // Usamos pool
        // this.pool = pool
        // this.pool.on('error', (err) => console.error(err))
    }

    /* generate() {
        const limit = 100
        // productos?size=10 muestra 10 productos
        for (let i = 0; i < limit; i++) {
            this.products.push({
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                price: faker.commerce.price(),
                image: faker.image.url(),
                // El siguiente atributo es para generar una regla de negocio:
                // si el producto está bloqueado, no se podrá acceder a él
                isBlock: faker.datatype.boolean(),
                // se pueden agregar más atributos falsos a cada producto
            })
    }
    } */

    async create(data) {
        // Antes de model.Product
        /* const newProduct = {
            id : faker.string.uuid(),
            isBlock: faker.datatype.boolean(),
            ...data
        }
        this.products.push(newProduct)
        return newProduct */

        // Con model.Product
        const newProduct = await models.Product.create(data)
        return newProduct
    }

    // retorna todos los productos
    async find() {
      // Antes de usar pg
        /* return new Promise((res, rej) => {
            setTimeout(() => {
                res(this.products)
            }, 3000)
        }) */

        /* // Usando pg
        const query = 'SELECT * FROM tasks'
        const rta = await this.pool.query(query)
        return rta.rows */

        /* // Optimización usando sequelize
        const query = 'SELECT * FROM tasks'
        const [data] = await sequelize.query(query)
        return data */

        const rta = await models.Product.findAll()
        return rta
    }

    // retorna el producto con el id pasado como parámetro
    async findOne(id) {
        // Antes de models.Product
        /* // Encuentra el artículo que tiene un id pasado como parámetro
        const product = this.products.find(item => item.id === id)
        if (!product) {
            throw boom.notFound('product not found')
        }
        // Se captura y se emite un error si el usuario intenta acceder a la información
        // de un producto bloqueado
        if (product.isBlock) {
            throw boom.conflict('product not found by conflict')
        }
        return product */

        // Con models.Product
        const product = await models.Product.findByPk(id)
        if (!product) {
            throw boom.notFound('product nor found')
        }
        return product
    }

    // actualiza los parámetros del producto cuyo id es el pasado como
    // parámetro y retorna el artículo actualizado
    async update(id, changes) {
        // Antes de models.Product
        /* const index = this.products.findIndex(item => item.id === id)
        if (index === -1) {
            // throw new Error('product not found')
            // Se usa boom para indicar que este error debe ser tratado como
            // "notFound" e internamente ya sabrá que esto es un error del tipo
            // 404
            throw boom.notFound('product not found')

        }

        // Las siguientes líneas permiten actualizar sólo los atributos pasados dentro
        // de changes, y conservar los demás atributos como están
        const product = this.products[index]
        this.products[index] = {
            ...product,
            ...changes
        }
        return this.products[index] */

        // Con models.Product
        const product = await this.findOne(id)
        const rta = await product.update(changes)
        return rta
    }

    // elimina el artículo con el id pasado como parámetro y retorna un
    // mensaje de true.
    async delete(id) {
        // Antes de models.Product
        /* const index = this.products.findIndex(item => item.id === id)
        if (index === -1) {
            // throw new Error('product not found')
            throw boom.notFound('product not found')

        }
        this.products.splice(index, 1)
        return {message: true} */

        // Con models.Product
        const product = await this.findOne(id)
        await product.destroy()
        return {id}
    }
}

module.exports = ProductServices
