const express = require('express');
const controller = require('../controllers/controllerProducts');

const router = express.Router();

router.put('/:id', controller.updateProduct);
router.post('/', controller.create);
router.get('/:id', controller.getProductById);
router.get('/', controller.getAllProducts);
router.delete('/:id', controller.removeProduct);

module.exports = router;
