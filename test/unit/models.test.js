const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
// const { getConnection } = require('../../src/models/mongoMockConnection')
const Products = require('../../src/models/products');
const SalesModel = require('../../src/models/sales');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoConnection = require('../../src/models/connection');

const DB_NAME = 'StoreManager';

describe('Testando comunicação com a tabela "products', () => {
  const payloadProducts = {
    "name": "Produto do Batista",
    "quantity": 100
  }

  // let connectionMock;
  const DB_SERVER = new MongoMemoryServer();

  // before(async () => {
  //   connectionMock = await getConnection();
  //   sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  // });

  // after(async() => {
  //   await connectionMock.db(DB_NAME).collection('products').drop();
  //   MongoClient.connect.restore();
  // });
  before(async () => {
    const URLMock = await DB_SERVER.getUri();
    const connectionMock = await MongoClient
      .connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((conn) => conn.db(DB_NAME));

    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });

  after(async () => {
    sinon.restore();
    await DB_SERVER.stop();
  });

  describe('Verificando se é possivel criar um produto', () =>{

    it('retorna um objeto', async() => {
      const response = await Products.create(payloadProducts);
      expect(response).to.be.a('object');
    });

    it('O objeto possui o "id" do novo product inserido', async () => {
      const response = await Products.create(payloadProducts);
      // console.log(response);
      expect(response).to.have.a.property('_id');
    });
  });

});

describe('Testando comunicação com a tabela "sales', () => {});
