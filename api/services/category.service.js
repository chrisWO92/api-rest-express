const {faker} = require('@faker-js/faker')
const boom = require('@hapi/boom')

// importamos sequilize que reemplazará a pool
const sequelize = require('../../libs/sequelize')

class CategoryServices {
    constructor() {
        this.categories = []
        this.generate()
    }

    generate() {
        for (let i = 0; i < 10; i++) {
            this.categories.push({
                id: faker.string.uuid(),
                description: faker.commerce.productAdjective(),
                isBlock: faker.datatype.boolean(),
            })
        }
    }

    create(data) {
        const newCategory = {
            id : faker.string.uuid(),
            ...data
        }
        this.categories.push(newCategory)
        return newCategory
    }

    async find() {
        /* return new Promise((res, rej) => {
            setTimeout(() => {
                res(this.categories)
            }, 3000)
        }) */

        // Optimización usando sequelize
        const query = 'SELECT * FROM tasks'
        const [data] = await sequelize.query(query)
        return data

    }
    async findOne(id) {
        // Encuentra la categoría que tiene un id pasado como parámetro
        const category = this.categories.find(category => category.id === id)
        if (!category) {
            throw boom.notFound('category not found')
        }
        // Se captura y se emite un error si el usuario intenta acceder a la información
        // de una categoría bloqueada
        if (category.isBlock) {
            throw boom.conflict('category not found by conflict')
        }
        return category
    }

    // actualiza los parámetros de la categoría cuyo id es el pasado como
    // parámetro y retorna la categoría actualizada
    async update(id, changes) {
        const index = this.categories.findIndex(category => category.id === id)
        if (index === -1) {
            // throw new Error('category not found')
            // Se usa boom para indicar que este error debe ser tratado como
            // "notFound" e internamente ya sabrá que esto es un error del tipo
            // 404
            throw boom.notFound('category not found')

        }

        // Las siguientes líneas permiten actualizar sólo los atributos pasados dentro
        // de changes, y conservar los demás atributos como están
        const category = this.categories[index]
        this.categories[index] = {
            ...category,
            ...changes
        }
        return this.categories[index]
    }

    // elimina la categoría con el id pasado como parámetro y retorna un
    // mensaje de true.
    async delete(id) {
        const index = this.categories.findIndex(category => category.id === id)
        if (index === -1) {
            // throw new Error('category not found')
            throw boom.notFound('category not found')

        }
        this.categories.splice(index, 1)
        return {message: true}
    }
}

module.exports = CategoryServices
