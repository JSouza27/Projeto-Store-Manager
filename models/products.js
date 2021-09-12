const { ObjectId } = require('mongodb');
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

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await connection();
  const findProduct = await connect.collection(TABLE).findOne(new ObjectId(id));

  return findProduct;
};

const getAllProducts = async () => {
  const connect = await connection();
  const findAllProducts = await connect.collection(TABLE).find({}).toArray();

  return findAllProducts;
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const connect = await connection();
  const product = await connect.collection(TABLE).update({ _id: new ObjectId(id) }, {
    $set: { name, quantity },
  });

  return product;
};

module.exports = {
  create,
  findByName,
  getProductById,
  getAllProducts,
  updateProduct,
};
