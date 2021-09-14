const express = require('express');
const controller = require('../controllers/controllerSales');

const router = express.Router();

router.get('/:id', controller.getSalesById);
router.put('/:id', controller.updateSale);
router.delete('/:id', controller.deleteSale);
router.post('/', controller.createSale);
router.get('/', controller.getAllSales);

module.exports = router;
