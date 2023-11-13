const express = require('express');
const router = express.Router();

const dataController = require('../controllers/dataCtrl')

router.get('/', dataController.getData)

module.exports = router