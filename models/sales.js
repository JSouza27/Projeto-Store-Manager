const { ObjectId } = require('mongodb');
const connection = require('./connection');

const TABLE = 'sales';

const findSales = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await connection();
  const searchProduct = await connect.collection(TABLE).find({ _id: new ObjectId(id) }).toArray();

  return searchProduct;
};

const register = async (sale) => {
  const connect = await connection();
  const db = await connect.collection(TABLE).insertOne({
    itensSold: sale,
  });

  return db;
};

const getAllSales = async () => {
  const connect = await connection();
  const db = await connect.collection(TABLE).find({}).toArray();
  return db;
};

const getSalesById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await connection();
  const searchSale = await connect.collection(TABLE).findOne({
    sales: { $elemMatch: { _id: new ObjectId(id) } },
  });

  return searchSale;
};

const updateSale = async (product, id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await connection();
  const updateQuery = await connect.collection(TABLE).updateOne(
    { _id: ObjectId(id) },
    { $set: product },
  );

  return updateQuery;
};

module.exports = {
  register,
  findSales,
  getAllSales,
  getSalesById,
  updateSale,
};
