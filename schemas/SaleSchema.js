const { errorMessage, errorCode } = require('./index');
const {
  HTTP_NOT_FOUND,
  HTTP_UNPROCESSABLE_ENTITY,
} = require('./HttpStatus');

const validateSales = (sale) => {
  const result = sale.some(({ quantity }) =>
  quantity < 1 || typeof quantity !== 'number');

  if (result) {
    return {
      status: HTTP_UNPROCESSABLE_ENTITY,
      message: { err: {
          code: errorCode.invalidData,
          message: errorMessage.lessThanZero,
        },
      },
    };
  }

  return {};
};

const checkSales = (arr) => {
  if (!arr || arr.length === 0 || arr === null) {
    return {
      status: HTTP_NOT_FOUND,
      message: {
        err: {
          code: errorCode.notFound,
          message: errorMessage.notFound,
        },
      },
    };
  }

  return {};
};

const isSale = (sale) => {
  if (!sale) {
    return {
      status: HTTP_UNPROCESSABLE_ENTITY,
      message: {
        err: {
          code: errorCode.invalidData,
          message: errorMessage.wrongSale,
        },
      },
    };
  }

  return {};
};

const validationStock = (array) => {
  const resultBool = array.every(({ value }) => value === false);

  if (resultBool) {
    return {
      status: HTTP_NOT_FOUND,
      message: {
        err: {
          code: errorCode.stockProblem,
          message: errorMessage.quantityLessThanZero,
        },
      },
    };
  }

  return {};
};

const validations = {
  checkQuantity: (sale) => validateSales(sale),
  nonExistentSale: (array) => checkSales(array),
  cannotDelete: (sale) => isSale(sale),
  checkStock: (array) => validationStock(array),
};

module.exports = validations;
