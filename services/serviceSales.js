const model = require('../models/sales');

const validateQuantity = (sale) => sale.some(({ quantity }) =>
  quantity < 1 || typeof quantity !== 'number');

const createSale = async (sale) => {
  const validation = await validateQuantity(sale);

  if (validation) {
    return {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
  }

  const stockValidation = await Promise.allSettled(sale.map(async ({ productId, quantity }) => {
    const products = await model.findProduct(productId);

    return products.some((product) => product.quantity > quantity);
  }));

  const result = stockValidation.every(({ value }) => value === false);

  if (result) {
    return {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      };
  }

  const insertSale = await model.createSale(sale);

  return insertSale;
};

const getAllSales = async () => {
  const allSales = await model.getAllSales();

  if (allSales.length === 0) {
    return {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  return allSales;
};

const getSalesById = async (id) => {
  const sale = await model.getSalesById(id);

  if (!sale || sale.length === 0) {
    return {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  return sale;
};

const updateSale = async (product, id) => {
  const { itensSold } = product;
  const validation = await validateQuantity(itensSold);

  if (validation) {
    return {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
  }

  await model.updateSale(product, id);

  const result = {
    _id: id,
    itensSold,
  };

  return result;
};

const deleteSale = async (id) => {
  const sale = await model.deleteSale(id);

  if (!sale) {
    return {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    };
  }

  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  getSalesById,
  updateSale,
  deleteSale,
};
