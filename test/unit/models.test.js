const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const ProductsModel = require('../../models/products');
const SalesModel = require('../../models/sales');

const DB_NAME = 'StoreManagerFake';
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

describe('Testando comunicação com a tabela "products', () => {
  const payloadProducts = {
    "name": "Produto do Batista",
    "quantity": 100
  }

  const DBServer = new MongoMemoryServer();
  let connectionMock;

  before(async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient
     .connect(URLMock, {
       useNewUrlParser: true,
       useUnifiedTopology: true
     })
     .then((conn) => conn.db('model_example'));


    sinon.stub(mongoConnection, 'connection')
      .resolves(connectionMock);
  });

  after(() => {
    mongoConnection.connection.restore();
  });

  describe('Verificando se é possivel criar um produto', () =>{

    // after(async () => {
    //   const db = await mongoConnection.connection();
    //   await db.collection('products').drop();
    // });


    it('deve retornar um objeto se inserido com sucesso', async () => {
      const response = await ProductsModel.create(payloadProducts);

      expect(response).to.be.a('object');
    });

    // it('o objeto retornado deve ter o "id" do novo produto criado', async () => {
    //   const response = await ProductsModel.create(newProduct);

    //   expect(response).to.have.property('_id');
    // })

    // it('o objeto deve conter a chave "name" e "quantity"', async () => {
    //   const response = await ProductsModel.create(newProduct);

    //   expect(response).to.have.property('name');
    //   expect(response).to.have.property('quantity');
    // });
  });

  // describe('Verificando se é possivel listar os produtos cadastrados', () => {
  //   const product = {
  //     "name": "Produto 3",
  //     "quantity": 10
  //   }

  //   let result;

  //   before(async () => {
  //     const db = await mongoConnection.connection();
  //     await db.collection(DB_NAME).insertOne(product);
  //     result = await db.collection(DB_NAME).findOne();
  //   });

  //   after(async () => {
  //     const db = await mongoConnection.connection();
  //     await db.collection(DB_NAME).drop();
  //   });

  //   it('o retorno deve ser um array', async () =>{
  //     await co
  //     const response = await ProductsModel.getAllProducts();

  //     expect(response).to.be.an('array');
  //   });

  //   it('deve ser possivel listar todos os produtos da tabela "products"', async () =>{
  //     const response = await ProductsModel.getAllProducts();

  //     expect(response).to.be.not.empty;
  //   });

  //   it('deve ser possivel listar os produtos da tabela "products" pelo ID dele', async () =>{
  //     const id = result['_id'];
  //     const response = await ProductsModel.getProductById(id);
  //     console.log(response);
  //     // expect(response.name).to.eql(newProduct.name);
  //   });
  // });
});

describe('Testando comunicação com a tabela "sales', () => {});
