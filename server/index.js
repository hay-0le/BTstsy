const express = require('express');
const models = require('./models/models.js');
const ItemDetails = require('./database/index.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
const port = 5555;
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.get('/api/description/:productId', models.getOneItem);
//   const id = req.params.productId;

// models.getOneItem(id)
  //   .then((value) => res.status(200).json(value))
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(404);
  //     res.send('Product not found');
  //   });
// );

//GET all
app.get('/api/description', (req, res) => {
  console.log('wrong get')
  models.getAllItems()
      .then((items) => res.status(200).json(items))
      .catch(err => {
        console.log(err);
        res.status(404);
        res.send("Did not retrieve items");
      })
})

//POST
app.post('/api/description', (req, res) => {
  try {
    const newItem = new ItemDetails(req.body);
    newItem.save((err, item) => {
      if (err) {
        console.log(err);
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
app.put('/api/description/:productId', (req, res) => {
  const id = req.params.productId;

  models.updateItem(id, req.body)
    .then(results => {
      res.send(results);
      res.status(200)

    }).catch(err => {
      console.log(err)
      res.status(500);
      res.send('Item not updated');
    })

})

//DELETE
app.delete('/api/description/:productId', (req, res) => {
  models.deleteItem(req.params.productId)
    .then(results => {
      res.send(results);

    }).catch(err => {
      console.log(err)
      res.status(500);
      res.send('Item not deleted')
    })
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${port}`);
});
