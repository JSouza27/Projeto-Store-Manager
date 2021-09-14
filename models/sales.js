const { ObjectId } = require('mongodb');
const connection = require('./connection');

const SALES_TABLE = 'sales';
const PRODUCTS_TABLE = 'products';

const decrementProducts = async (id, quantity) => {
  const connect = await connection();
  await connect.collection(PRODUCTS_TABLE).updateOne(
    { _id: ObjectId(id) },
    { $inc: { quantity: -quantity } },
  );
};

const incrementProducts = async (id, quantity) => {
  const connect = await connection();
  await connect.collection(PRODUCTS_TABLE).updateOne(
    { _id: ObjectId(id) },
    { $inc: { quantity } },
  );
};

const findSales = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await connection();
  const searchProduct = await connect.collection(SALES_TABLE).find({
    _id: new ObjectId(id) }).toArray();

  return searchProduct;
};

const createSale = async (sale) => {
  const connect = await connection();

  await sale.forEach(({ productId, quantity }) => decrementProducts(productId, quantity));

  const db = await connect.collection(SALES_TABLE).insertOne({
    itensSold: sale,
  });

  return db;
};

const getAllSales = async () => {
  const connect = await connection();
  const db = await connect.collection(SALES_TABLE).find({}).toArray();
  return db;
};

const getSalesById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await connection();
  const searchSale = await connect.collection(SALES_TABLE).find({
    _id: new ObjectId(id),
  }).toArray();

  return searchSale;
};

const updateSale = async (product, id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await connection();
  const updateQuery = await connect.collection(SALES_TABLE).updateOne(
    { _id: ObjectId(id) },
    { $set: product },
  );

  return updateQuery;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const [sale] = await getSalesById(id);

  await sale.itensSold.forEach(({ productId, quantity }) => incrementProducts(productId, quantity));

  const connect = await connection();
  await connect.collection(SALES_TABLE).deleteOne({ _id: new ObjectId(id) });

  return sale;
};

const findProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await connection();
  const find = connect.collection(PRODUCTS_TABLE).find({ _id: ObjectId(id) }).toArray();

  return find;
};

module.exports = {
  createSale,
  findSales,
  getAllSales,
  getSalesById,
  updateSale,
  deleteSale,
  findProduct,
};
