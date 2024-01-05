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
const pool = require('../../libs/postgres.pool')

class ProductServices {

    constructor() {
        // Definimos un array products vacío para luego poblar con generate()
        this.products = []

        // La siguiente línea permite generar todos los artículos de la tienda
        // y que se mantengan en la memoria del navegador, por lo menos hasta que se refresque el navegador.
        // Esto permite a su vez manipular el mismo array desde Insomnia.
        this.generate()

        // Usamos pool
        this.pool = pool
        this.pool.on('error', (err) => console.error(err))
    }

    generate() {
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
    }

    create(data) {
        const newProduct = {
            id : faker.string.uuid(),
            isBlock: faker.datatype.boolean(),
            ...data
        }
        this.products.push(newProduct)
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

        // Usando pg
        const query = 'SELECT * FROM tasks'
        const rta = await this.pool.query(query)
        return rta.rows
    }

    // retorna el producto con el id pasado como parámetro
    async findOne(id) {
        // Encuentra el artículo que tiene un id pasado como parámetro
        const product = this.products.find(item => item.id === id)
        if (!product) {
            throw boom.notFound('product not found')
        }
        // Se captura y se emite un error si el usuario intenta acceder a la información
        // de un producto bloqueado
        if (product.isBlock) {
            throw boom.conflict('product not found by conflict')
        }
        return product
    }

    // actualiza los parámetros del producto cuyo id es el pasado como
    // parámetro y retorna el artículo actualizado
    async update(id, changes) {
        const index = this.products.findIndex(item => item.id === id)
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
        return this.products[index]
    }

    // elimina el artículo con el id pasado como parámetro y retorna un
    // mensaje de true.
    async delete(id) {
        const index = this.products.findIndex(item => item.id === id)
        if (index === -1) {
            // throw new Error('product not found')
            throw boom.notFound('product not found')

        }
        this.products.splice(index, 1)
        return {message: true}
    }
}

module.exports = ProductServices
