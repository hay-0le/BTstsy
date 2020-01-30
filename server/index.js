const express = require('express');
const models = require('./models/models.js');
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


//GET one item
app.get('/api/description/:productId', models.getOneItem);

//GET all items
app.get('/api/description', models.getAllItems);

//POST create new item
app.post('/api/description', models.addItem);

//PUT update item information
app.put('/api/description/:productId', models.updateItem);

//DELETE one item
app.delete('/api/description/:productId', models.deleteItem);


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${port}`);
});