const express = require('express');
const controller = require('../controllers/controllerProducts');

const router = express.Router();

router.post('/', controller.create);
router.get('/:id', controller.getProductById);
router.get('/', controller.getAllProducts);

module.exports = router;