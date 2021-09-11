const service = require('../services/productService');
const {
  HTTP_CREATED,
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_OK_STATUS,
} = require('../middlewares/HttpStatus');

const create = async (req, res) => {
  const product = req.body;

  const newProduct = await service.create(product);

  if (newProduct.message) return res.status(HTTP_UNPROCESSABLE_ENTITY).json({ err: newProduct });

  return res.status(HTTP_CREATED).json(newProduct);
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  const findProduct = await service.getProductById(id);

  if (findProduct.message) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
      err: findProduct,
  });
}

  return res.status(HTTP_OK_STATUS).json(findProduct);
};

const getAllProducts = async (_req, res) => {
  const allProducts = await service.getAllProducts();

  return res.status(HTTP_OK_STATUS).json({ products: allProducts });
};

module.exports = {
  create,
  getProductById,
  getAllProducts,
};
