const {faker} = require('@faker-js/faker')
const boom = require('@hapi/boom')

class UserServices {
    constructor() {
        this.users = []
        this.generate()
    }

    generate() {
        for (let i = 0; i < 20; i++) {
            this.users.push({
                id: faker.string.uuid(),
                name: faker.person.firstName()  ,
                lastName: faker.person.lastName(),
                sex: faker.person.sex(),
                jobTitle: faker.person.jobTitle(),
                isBlock: faker.datatype.boolean(),
            })
        }
    }

    create(data) {
        const newUser = {
            id : faker.string.uuid(),
            ...data
        }
        this.users.push(newUser)
        return newUser
    }

    find() {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(this.users)
            }, 3000)
        })

    }

    async findOne(id) {
        return this.users.find(user => user.id === id)
    }

    async findOne(id) {
        // Encuentra el user que tiene un id pasado como parámetro
        const user = this.users.find(user => user.id === id)
        if (!user) {
            throw boom.notFound('user not found')
        }
        // Se captura y se emite un error si el usuario intenta acceder a la información
        // de un user bloqueado
        if (user.isBlock) {
            throw boom.conflict('user not found by conflict')
        }
        return user
    }

    // actualiza los parámetros de user cuyo id es el pasado como
    // parámetro y retorna la categoría actualizada
    async update(id, changes) {
        const index = this.users.findIndex(user => user.id === id)
        if (index === -1) {
            // throw new Error('user not found')
            // Se usa boom para indicar que este error debe ser tratado como
            // "notFound" e internamente ya sabrá que esto es un error del tipo
            // 404
            throw boom.notFound('user not found')

        }

        // Las siguientes líneas permiten actualizar sólo los atributos pasados dentro
        // de changes, y conservar los demás atributos como están
        const user = this.users[index]
        this.users[index] = {
            ...user,
            ...changes
        }
        return this.users[index]
    }

    // elimina el usuario con el id pasado como parámetro y retorna un
    // mensaje de true.
    async delete(id) {
        const index = this.users.findIndex(user => user.id === id)
        if (index === -1) {
            // throw new Error('user not found')
            throw boom.notFound('user not found')

        }
        this.users.splice(index, 1)
        return {message: true}
    }
}

module.exports = UserServices
