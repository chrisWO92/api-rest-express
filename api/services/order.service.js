
const boom = require('@hapi/boom'); 
const { models } = require('../libs/sequelize'); 

class OrderService {
    constructor() {

     }
    async find() { 
        const rta = await models.Order.findAll({ 
            // de esta manera se resuelve la asociaón de forma anidada
            include: ['customer'] 
        }); 
        return rta; 
    }
    async findOne(id) {
        const order = await models.Order.findByPk(id, {
            include: ['customer']
        }); 
        if (!order) { 
            throw boom.notFound('order not found'); 
        }
        return order;
    }
    async create(data) { 
        const newOrder = await models.Order.create(
            data,
            { 
                include: ['customer'] 
            }); 
        return newOrder; 
    }
    async addItem(data) { 
        const newItem = await models.OrderProduct.create(data); 
        return newItem; 
    }
    async update(id, changes) { 
        const model = await this.findOne(id); 
        const rta = await model.update(changes); 
        return rta; 
    }
    async delete(id) { 
        const model = await this.findOne(id); 
        await model.destroy(); 
        return { rta: true }; 
    }
}
    
module.exports = OrderService;