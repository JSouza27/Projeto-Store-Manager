const model = require('../models/sales');

const validateQuantity = (sale) => sale.some(({ quantity }) =>
  quantity < 1 || typeof quantity !== 'number');

const register = async (sale) => {
  const validation = await validateQuantity(sale);

  if (validation) {
    return {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      };
  }

  const insertSale = await model.register(sale);

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

  if (!sale) {
    return {
      code: 'not_found',
      message: 'Sale not found',
    };
  }

  return sale;
};

module.exports = {
  register,
  getAllSales,
  getSalesById,
};
