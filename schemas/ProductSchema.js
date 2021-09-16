const model = require('../models/products');
const { errorMessage, errorCode } = require('./index');
const {
  HTTP_OK_STATUS,
  HTTP_UNPROCESSABLE_ENTITY,
} = require('./HttpStatus');

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
      message: { err: { code: errorCode.invalidData, message: errorMessage.blanck } },
    };
    case isLetterThan(name.length, 5): return {
      status: HTTP_UNPROCESSABLE_ENTITY,
      message: { err: { code: errorCode.invalidData, message: errorMessage.nameLength } },
    };
    case isExist(name): return {
      status: HTTP_UNPROCESSABLE_ENTITY,
      message: { err: { code: errorCode.invalidData, message: errorMessage.productExist } },
    };

    default: return {};
  }
};

const validateQuantity = (quantity) => {
  switch (true) {
    case isLetterThan(quantity, 1): return {
      status: HTTP_UNPROCESSABLE_ENTITY,
      message: { err: { code: errorCode.invalidData, message: errorMessage.quantityValue } },
    };
    case isNotNumber(quantity): return {
      status: HTTP_UNPROCESSABLE_ENTITY,
      message: { err: { code: errorCode.invalidData, message: errorMessage.quantityNotString } },
    };
    default: return {};
  }
};

const alreadyExixst = () => ({
    status: HTTP_UNPROCESSABLE_ENTITY,
    message: { err: { code: errorCode.invalidData, message: 'Product already exists' } },
  });

const validateGetProduct = (products) => {
  if (!products) {
    return {
      status: HTTP_UNPROCESSABLE_ENTITY,
      message: { err: { code: errorCode.invalidData, message: errorMessage.productNotExist } },
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
