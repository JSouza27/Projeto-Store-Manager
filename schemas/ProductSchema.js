const model = require('../models/products');

const errors = {
  blanck: 'Required field',
  nameLength: '"name" length must be at least 5 characters long',
  productExist: 'Product already exists',
  quantityValue: '"quantity" must be larger than or equal to 1',
  quantityNotString: '"quantity" must be a number',
  productNotExist: 'Wrong id format',
};

const code = 'invalid_data';

const blanck = (value) => (!value);
const isLetterThan = (value, min) => (value < min);
const isExist = (name) => {
  const result = model.findByName(name);

  return result;
};
const isNotNumber = (value) => (typeof value !== 'number');

const validateName = (name) => {
  switch (true) {
    case blanck(name): return { code, message: errors.blanck };
    case isLetterThan(name.length, 5): return { code, message: errors.nameLength };
    case isExist(name): return { code, message: errors.productExist };

    default: return {};
  }
};

const validateQuantity = (quantity) => {
  switch (true) {
    case isLetterThan(quantity, 1): return { code, message: errors.quantityValue };
    case isNotNumber(quantity): return { code, message: errors.quantityNotString };
    default: return {};
  }
};

const validateGetProduct = (products) => {
  if (!products) return { code, message: errors.productNotExist };

  return products;
};

module.exports = {
  validateName,
  validateQuantity,
  validateGetProduct,
};
