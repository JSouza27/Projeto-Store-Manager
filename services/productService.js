const model = require('../models/products');
const {
  HTTP_CREATED,
  HTTP_OK_STATUS,
} = require('../schemas/HttpStatus');
const {
  validateName,
  validateQuantity,
  validateGetProduct,
  alreadyExixst,
} = require('../schemas/ProductSchema');

const create = async (products) => {
  const { name, quantity } = products;

  const result = await model.findByName(name);

  if (result) return alreadyExixst();

  const validationName = await validateName(name);
  const validationQuantity = await validateQuantity(quantity);

  if (validationName.message) return validationName;
  if (validationQuantity.message) return validationQuantity;

  const createReturn = await model.create(products);
  const newProduct = {
    status: HTTP_CREATED,
    message: createReturn,
  };

  return newProduct;
};

const getProductById = async (id) => {
  const getProduct = await model.getProductById(id);

  const validateProducts = await validateGetProduct(getProduct);

  return validateProducts;
};

const getAllProducts = async () => {
  const getAll = await model.getAllProducts();

  const result = {
    status: HTTP_OK_STATUS,
    message: {
      products: getAll,
    },
  };

  return result;
};

const updateProduct = async (id, name, quantity) => {
  const validationName = await validateName(name);
  const validationQuantity = await validateQuantity(quantity);

  if (validationName.message) return validationName;
  if (validationQuantity.message) return validationQuantity;

  await model.updateProduct(id, name, quantity);

  const result = {
    status: HTTP_OK_STATUS,
    message: { id, name, quantity },
  };

  return result;
};

const removeProduct = async (id) => {
  const isProduct = await model.getProductById(id);

  const validateProducts = await validateGetProduct(isProduct);

  await model.removeProduct(id);

  return validateProducts;
};

module.exports = {
  create,
  getProductById,
  getAllProducts,
  updateProduct,
  removeProduct,
};
