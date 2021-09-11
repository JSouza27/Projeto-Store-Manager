const model = require('../models/products');
const { validateName, validateQuantity } = require('../schemas/ProductSchema');

const create = async (products) => {
  const { name, quantity } = products;

  const result = await model.findByName(name);

  const validationName = await validateName(name);
  const validationQuantity = await validateQuantity(quantity);

  if (validationName.message) return validationName;
  if (validationQuantity.message) return validationQuantity;

  if (result) {
    return {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }

  const newProduct = await model.create(products);

  return newProduct;
};

module.exports = {
  create,
};
