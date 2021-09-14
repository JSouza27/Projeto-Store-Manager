const service = require('../services/serviceSales');
const {
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND,
} = require('../middlewares/HttpStatus');

const createSale = async (req, res) => {
  const sales = req.body;

  const newSale = await service.createSale(sales);

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

  return res.status(HTTP_OK_STATUS).json(newSale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const isDelete = await service.deleteSale(id);

  if (isDelete.code === 'invalid_data') {
    return res.status(HTTP_UNPROCESSABLE_ENTITY).json({ err: isDelete });
  }

  return res.status(HTTP_OK_STATUS).json(isDelete);
};

module.exports = {
  createSale,
  getAllSales,
  getSalesById,
  updateSale,
  deleteSale,
};
