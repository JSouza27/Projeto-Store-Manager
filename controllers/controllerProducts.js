const service = require('../services/productService');

const create = async (req, res) => {
  const product = req.body;

  const newProduct = await service.create(product);

  if (newProduct.message) return res.status(422).json({ err: newProduct });

  return res.status(201).json(newProduct);
};

module.exports = {
  create,
};
