const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares')
const ordersController = require('../controllers/ordersController')

router.get('/', authenticate, ordersController.getOrders)
router.post('/', authenticate, ordersController.postOrders)
router.patch('/', authenticate, ordersController.deleteOrders)

module.exports = router