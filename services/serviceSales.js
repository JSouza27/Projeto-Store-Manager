const model = require('../models/sales');
const { HTTP_OK_STATUS } = require('../schemas/HttpStatus');
const {
  nonExistentSale,
  checkQuantity,
  cannotDelete,
  checkStock,
} = require('../schemas/SaleSchema');

const createSale = async (sale) => {
  const validation = await checkQuantity(sale);

  if (validation.notification) return validation;

  const stockValidation = await Promise.allSettled(sale.map(async ({ productId, quantity }) => {
    const products = await model.findProduct(productId);

    return products.some((product) => product.quantity > quantity);
  }));

  const returnValidation = await checkStock(stockValidation);

  if (returnValidation.notification) return returnValidation;

  await sale.forEach(({ productId, quantity }) =>
    model.decrementProducts(productId, quantity));

  const { ops } = await model.createSale(sale);

  const newSale = {
    status: HTTP_OK_STATUS,
    notification: ops[0],
  };

  return newSale;
};

const getAllSales = async () => {
  const allSales = await model.getAllSales();
  const valitationSale = await nonExistentSale(allSales);

  if (valitationSale.notification) return valitationSale;

  const returnAllSales = {
    status: HTTP_OK_STATUS,
    notification: {
        sales: allSales,
    },
  };

  return returnAllSales;
};

const getSalesById = async (id) => {
  const sale = await model.getSalesById(id);
  const valitationSale = await nonExistentSale(sale);

  if (valitationSale.notification) return valitationSale;

  const returnSaleById = {
    status: HTTP_OK_STATUS,
    notification: {
        sales: sale,
    },
  };

  return returnSaleById;
};

const updateSale = async (product, id) => {
  const { itensSold } = product;
  const validation = await checkQuantity(itensSold);

  if (validation.notification) return validation;

  await model.updateSale(product, id);

  const result = {
    status: HTTP_OK_STATUS,
    notification: {
      _id: id,
      itensSold,
    },
  };
  return result;
};

const deleteSale = async (id) => {
  const sale = await model.deleteSale(id);

  const checkDelete = await cannotDelete(sale);

  if (checkDelete.notification) return checkDelete;

  await sale.itensSold.forEach(({ productId, quantity }) =>
    model.incrementProducts(productId, quantity));

  const itemDeleted = {
    status: HTTP_OK_STATUS,
    notification: sale,
  };

  return itemDeleted;
};

module.exports = {
  createSale,
  getAllSales,
  getSalesById,
  updateSale,
  deleteSale,
};
