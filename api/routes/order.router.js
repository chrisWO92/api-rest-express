
const express = require('express')
const router = express.Router()

const OrderServices = require('../services/order.service')
const services = new OrderServices()

const validatorHandler = require('../middlewares/validator.handler')

const {
  createOrderScheme,
  getOrderScheme
} = require('../schemes/order.scheme')

router.get('/', async (req, res) => {
    const orders = await services.find()
    res.json(orders)
})

router.get(
    '/:id',
    validatorHandler(getOrderScheme, 'params'),
    async (req, res, next) => {
    try {
        const { id } = req.params
        const item = await services.findOne(id)
        res.json(item)
    } catch (error) {
        next(error)
    }

})

router.post(
    '/',
    validatorHandler(createOrderScheme, 'body'),
    async (req, res) => {
    const body = req.body
    const newOrder = await services.create(body)
    res.status(200).json(newOrder)
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    const message = await services.delete(id)
    res.json(message)
})



module.exports = router
