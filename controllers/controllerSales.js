const service = require('../services/serviceSales');
const { HTTP_INTERNAL_SERVER_ERROR } = require('../schemas/HttpStatus');

const UNEXPECTED_ERROR = 'unexpected error';

const createSale = async (req, res) => {
  try {
    const sales = req.body;

    const { status, message } = await service.createSale(sales);

    return res.status(status).json(message);
  } catch (e) {
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: UNEXPECTED_ERROR });
  }
};

const getAllSales = async (_req, res) => {
  try {
    const { status, message } = await service.getAllSales();

    return res.status(status).json(message);
  } catch (e) {
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: UNEXPECTED_ERROR });
  }
};

const getSalesById = async (req, res) => {
  try {
    const { id } = req.params;

    const { status, message } = await service.getSalesById(id);

    return res.status(status).json(message);
  } catch (e) {
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: UNEXPECTED_ERROR });
  }
};

const updateSale = async (req, res) => {
  try {
    const itensSold = req.body;
    const { id } = req.params;

    const { status, message } = await service.updateSale({ itensSold }, id);

    return res.status(status).json(message);
  } catch (e) {
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: UNEXPECTED_ERROR });
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;

    const { status, message } = await service.deleteSale(id);

    return res.status(status).json(message);
  } catch (e) {
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: UNEXPECTED_ERROR });
  }
};

module.exports = {
  createSale,
  getAllSales,
  getSalesById,
  updateSale,
  deleteSale,
};
