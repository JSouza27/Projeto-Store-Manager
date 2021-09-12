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

module.exports = {
  register,
};
