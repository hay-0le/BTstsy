const express = require('express');
const models = require('./database/models.js');
const ItemDetails = require('./database/index.js');


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
  // console.log(productId);
  models.getOneItem(productId)
    .then((value) => res.status(200).json(value))
    .catch((err) => {
      console.log(err);
      res.status(404)
      res.send('Product not found');
    });
});

//POST
app.post('/api/description', (req, res) => {
  try {
    const newItem = new ItemDetails(req.body);
    newItem.save((err, item) => {
      if (err) {
        console.log(err);
        console.log('error with ', item)
      } else {
        console.log(item)
      }
    });
    res.send(newItem);
    console.log('Item details posted!')
  } catch(err ) {
    res.status(500).send(err);
    console.log(err)
    console.log(req.body)
  }
})

//PUT

//DELETE

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${port}`);
});
