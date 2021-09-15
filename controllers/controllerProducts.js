const service = require('../services/productService');
const { HTTP_INTERNAL_SERVER_ERROR } = require('../schemas/HttpStatus');

const UNEXPECTED_ERROR = 'unexpected error';

const create = async (req, res) => {
  try {
    const product = req.body;

    const { status, message } = await service.create(product);

    return res.status(status).json(message);
  } catch (e) {
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: UNEXPECTED_ERROR });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const { status, message } = await service.getProductById(id);

    return res.status(status).json(message);
  } catch (e) {
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: UNEXPECTED_ERROR });
  }
};

const getAllProducts = async (_req, res) => {
  try {
    const { status, message } = await service.getAllProducts();

    return res.status(status).json(message);
  } catch (e) {
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: UNEXPECTED_ERROR });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const { status, message } = await service.updateProduct(id, name, quantity);

    return res.status(status).json(message);
  } catch (e) {
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: UNEXPECTED_ERROR });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { status, message } = await service.removeProduct(id);

    return res.status(status).json(message);
  } catch (e) {
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: UNEXPECTED_ERROR });
  }
};

module.exports = {
  create,
  getProductById,
  getAllProducts,
  updateProduct,
  removeProduct,
};
