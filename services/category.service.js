const {faker} = require('@faker-js/faker')

class CategoryServices {
    constructor() {
        this.categories = []
        this.generate()
    }

    generate() {
        for (let i = 0; i < 10; i++) {
            this.categories.push({
                id: faker.string.uuid(),
                description: faker.commerce.productAdjective()
            })
        } 
    }

    find() {
        return this.categories

    }

    findOne(id) {
        return this.categories.find(category => category.id === id)
    }
}

module.exports = CategoryServices
