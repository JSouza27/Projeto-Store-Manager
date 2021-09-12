const service = require('../services/serviceSales');
const {
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_OK_STATUS,
} = require('../middlewares/HttpStatus');

const register = async (req, res) => {
  const sales = req.body;

  const newSale = await service.register(sales);

  if (newSale.code) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({ err: newSale });
  }

  return res.status(HTTP_OK_STATUS).json(newSale.ops[0]);
};

module.exports = {
  register,
};
