const express = require('express');
const controller = require('../controllers/controllerProducts');

const router = express.Router();

router.post('/', controller.create);

module.exports = router;
