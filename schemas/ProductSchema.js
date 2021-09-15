const model = require('../models/products');
const {
  HTTP_OK_STATUS,
  HTTP_UNPROCESSABLE_ENTITY,
} = require('./HttpStatus');

const code = 'invalid_data';

const errors = {
  blanck: 'Required field',
  nameLength: '"name" length must be at least 5 characters long',
  productExist: 'Product already exists',
  quantityValue: '"quantity" must be larger than or equal to 1',
  quantityNotString: '"quantity" must be a number',
  productNotExist: 'Wrong id format',
};

const blanck = (value) => (!value);
const isLetterThan = (value, min) => (value < min);
const isExist = (name) => {
  const result = model.findByName(name);

  return result;
};
const isNotNumber = (value) => (typeof value !== 'number');

const validateName = (name) => {
  switch (true) {
    case blanck(name): return {
      status: HTTP_UNPROCESSABLE_ENTITY,
      message: { err: { code, message: errors.blanck } },
    };
    case isLetterThan(name.length, 5): return {
      status: HTTP_UNPROCESSABLE_ENTITY,
      message: { err: { code, message: errors.nameLength } },
    };
    case isExist(name): return {
      status: HTTP_UNPROCESSABLE_ENTITY,
      message: { err: { code, message: errors.productExist } },
    };

    default: return {};
  }
};

const validateQuantity = (quantity) => {
  switch (true) {
    case isLetterThan(quantity, 1): return {
      status: HTTP_UNPROCESSABLE_ENTITY,
      message: { err: { code, message: errors.quantityValue } },
    };
    case isNotNumber(quantity): return {
      status: HTTP_UNPROCESSABLE_ENTITY,
      message: { err: { code, message: errors.quantityNotString } },
    };
    default: return {};
  }
};

const alreadyExixst = () => ({
    status: HTTP_UNPROCESSABLE_ENTITY,
    message: { err: { code, message: 'Product already exists' } },
  });

const validateGetProduct = (products) => {
  if (!products) {
    return {
      status: HTTP_UNPROCESSABLE_ENTITY,
      message: { err: { code, message: errors.productNotExist } },
    };
  }

  return {
    status: HTTP_OK_STATUS,
    message: products,
  };
};

module.exports = {
  validateName,
  validateQuantity,
  validateGetProduct,
  alreadyExixst,
};
