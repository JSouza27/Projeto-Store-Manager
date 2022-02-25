const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { sales, products } = require('./src/routers');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', products);
app.use('/sales', sales);

app.listen(PORT, () => { console.log(`Ouvindo a porta ${PORT}`); });
