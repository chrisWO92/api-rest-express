const Joi = require('joi');

const id = Joi.number().integer(); 
const customerId = Joi.number().integer(); 
const orderId = Joi.number().integer(); 
const productId = Joi.number().integer(); 
const ammount = Joi.number().integer(); 

const getOrderSchema = Joi.object(
    { 
        id: id.required(),
    }
); 

const createOrderSchema = Joi.object(
    { 
        customerId: customerId.required(), 
    }
); 

const addItemSchema = Joi.object(
    { 
        orderId: orderId.required(), 
        productId: productId.required(), 
        ammount: ammount.required(), 
    }
); 
module.exports = { 
    getOrderSchema, 
    createOrderSchema,
    addItemSchema 
};