const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const TABLE = 'products';

const create = async (products) => {
  const connect = await getConnection();
  const db = await connect.collection(TABLE).insertOne(products);

  return db.ops[0];
};

const findByName = async (name) => {
  const connect = await getConnection();
  const productName = await connect.collection(TABLE).findOne({ name });

  return productName;
};

const getProductById = async (id) => {
  const connect = await getConnection();
  const findProduct = await connect.collection(TABLE).findOne({ _id: new ObjectId(id) });

  return findProduct;
};

const getAllProducts = async () => {
  const connect = await getConnection();
  const findAllProducts = await connect.collection(TABLE).find({}).toArray();

  return findAllProducts;
};

const updateProduct = async (id, name, quantity) => {
  const connect = await getConnection();
  const product = await connect.collection(TABLE).update({ _id: new ObjectId(id) }, {
    $set: { name, quantity },
  });

  return product;
};

const removeProduct = async (id) => {
  const connect = await getConnection();
  const product = await connect.collection(TABLE).deleteOne({ _id: new ObjectId(id) });

  return product;
};

module.exports = {
  create,
  findByName,
  getProductById,
  getAllProducts,
  updateProduct,
  removeProduct,
};
