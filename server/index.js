const express = require('express');
const models = require('./database/models.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
const port = 4444;
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.get('/api/description/:productId', (req, res) => {
  const productId = req.params.productId;
  console.log(productId);
  models.getOneItem(productId)
    .then((value) => res.status(200).json(value))
    .catch((err) => {
      res.status(404)
      res.send('Product not found');
    });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${port}`);
});
