const {
  HTTP_NOT_FOUND,
  HTTP_UNPROCESSABLE_ENTITY,
} = require('./HttpStatus');

const codeError = {
  invalidData: 'invalid_data',
  stockProblem: 'stock_problem',
  notFound: 'not_found',
};

const erros = {
  lessThanZero: 'Wrong product ID or invalid quantity',
  notFound: 'Sale not found',
  wrongSale: 'Wrong sale ID format',
  stockProblem: 'stock_problem',
  quantityLessThanZero: 'Such amount is not permitted to sell',
};

const validateSales = (sale) => {
  const result = sale.some(({ quantity }) =>
  quantity < 1 || typeof quantity !== 'number');

  if (result) {
    return {
      status: HTTP_UNPROCESSABLE_ENTITY,
      message: { err: {
          code: codeError.invalidData,
          message: erros.lessThanZero,
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
          code: codeError.notFound,
          message: erros.notFound,
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
          code: codeError.invalidData,
          message: erros.wrongSale,
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
          code: codeError.stockProblem,
          message: erros.quantityLessThanZero,
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
