const express = require('express');
const router = express.Router();
const {authenticate} = require('../middlewares')
const ordersController = require('../controllers/ordersController')

router.get('/', authenticate, ordersController.getOrders)
// router.get('/orders', authenticate, ordersController.)
router.post('/', authenticate, ordersController.postOrders)
router.patch('/', authenticate, ordersController.deleteProcedure)
router.delete('/', authenticate, ordersController.deleteOrder)

module.exports = router