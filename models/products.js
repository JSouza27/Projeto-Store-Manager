const connection = require('./connection');

const TABLE = 'products';

const create = async (products) => {
  const connect = await connection();
  const db = await connect.collection(TABLE).insertOne(products);

  return db.ops[0];
};

const findByName = async (name) => {
  const connect = await connection();
  const productName = await connect.collection(TABLE).findOne({ name });

  return productName;
};

module.exports = {
  create,
  findByName,
};
