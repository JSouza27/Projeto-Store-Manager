const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const SALES_TABLE = 'sales';
const PRODUCTS_TABLE = 'products';

const decrementProducts = async (id, quantity) => {
  const connect = await getConnection();
  await connect.collection(PRODUCTS_TABLE).updateOne(
    { _id: ObjectId(id) },
    { $inc: { quantity: -quantity } },
  );
};

const incrementProducts = async (id, quantity) => {
  const connect = await getConnection();
  await connect.collection(PRODUCTS_TABLE).updateOne(
    { _id: ObjectId(id) },
    { $inc: { quantity } },
  );
};

const createSale = async (sale) => {
  const connect = await getConnection();

  const db = await connect.collection(SALES_TABLE).insertOne({
    itensSold: sale,
  });

  return db;
};

const getAllSales = async () => {
  const connect = await getConnection();
  const db = await connect.collection(SALES_TABLE).find({}).toArray();
  return db;
};

const getSalesById = async (id) => {
  const connect = await getConnection();
  const searchSale = await connect.collection(SALES_TABLE).find({
    _id: new ObjectId(id),
  }).toArray();

  return searchSale;
};

const updateSale = async (product, id) => {
  const connect = await getConnection();
  const updateQuery = await connect.collection(SALES_TABLE).updateOne(
    { _id: ObjectId(id) },
    { $set: product },
  );

  return updateQuery;
};

const deleteSale = async (id) => {
  const [sale] = await getSalesById(id);

  const connect = await getConnection();
  await connect.collection(SALES_TABLE).deleteOne({ _id: new ObjectId(id) });

  return sale;
};

const findProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await getConnection();
  const find = connect.collection(PRODUCTS_TABLE).find({ _id: ObjectId(id) }).toArray();

  return find;
};

module.exports = {
  createSale,
  getAllSales,
  getSalesById,
  updateSale,
  deleteSale,
  findProduct,
  decrementProducts,
  incrementProducts,
};
