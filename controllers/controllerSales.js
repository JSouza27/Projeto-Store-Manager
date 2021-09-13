const service = require('../services/serviceSales');
const {
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND,
} = require('../middlewares/HttpStatus');

const register = async (req, res) => {
  const sales = req.body;

  const newSale = await service.register(sales);

  if (newSale.code) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({ err: newSale });
  }

  return res.status(HTTP_OK_STATUS).json(newSale.ops[0]);
};

const getAllSales = async (_req, res) => {
  const getAll = await service.getAllSales();

  if (getAll.code) {
    return res.status(HTTP_NOT_FOUND).json({ err: getAll });
  }

  return res.status(HTTP_OK_STATUS).json({ sales: getAll });
};

const getSalesById = async (req, res) => {
  const { id } = req.params;

  const getSale = await service.getSalesById(id);

  if (getSale.code) {
    return res.status(HTTP_NOT_FOUND).json({ err: getSale });
  }

  return res.status(HTTP_OK_STATUS).json({ sales: getSale });
};

const updateSale = async (req, res) => {
  const itensSold = req.body;
  const { id } = req.params;

  const newSale = await service.updateSale({ itensSold }, id);

  if (newSale.code) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({ err: newSale });
  }
  console.log(newSale);
  return res.status(HTTP_OK_STATUS).json(newSale);
};

module.exports = {
  register,
  getAllSales,
  getSalesById,
  updateSale,
};
