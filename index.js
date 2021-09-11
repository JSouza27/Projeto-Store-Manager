const express = require('express');
const productRouter = require('./routers/productRouters');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);

app.listen(PORT, () => { console.log(`Ouvindo a porta ${PORT}`); });
