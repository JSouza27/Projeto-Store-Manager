const express = require('express');
const controller = require('../controllers/controllerSales');

const router = express.Router();

router.post('/', controller.register);
router.get('/', controller.getAllSales);
router.get('/:id', controller.getSalesById);

module.exports = router;
