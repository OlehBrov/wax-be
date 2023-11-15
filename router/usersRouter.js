const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares')
const userController = require('../controllers/usersController')

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/logout', authenticate, userController.logoutUser)
router.get('/allusers', userController.getAll)

module.exports = router