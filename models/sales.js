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

module.exports = {
  register,
  findSales,
};
