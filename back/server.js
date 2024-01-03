const express = require('express')
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const walletService = require('./wallet.service');


const port = process.env.PORT || 5000;
const app = express()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  // app.use(express.static(path.resolve('public')))
  app.use(express.static(path.join(__dirname, 'client/build')));
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

// app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.get('/api/get-data', (req, res) => {
  walletService.getData(req.query.dbName)
    .then((data) => {
      console.log(data, 'app-console Количество монет')
      res.send(data)
    })
    .catch(err => {
      console.log('Error:', err)
      res.status(400).send('Cannot get data')
    })
})


app.get('/api/add-data', (req, res) => {
  const params = req.query
  console.log(params)
  walletService.add(params.dbName, params.data)
    .then((data) => {
      console.log(data, 'app-console Количество монет')
      res.send(data)
    })
    .catch(err => {
      console.log('Error:', err)
      res.status(400).send('Cannot add data')
    })
})

app.get('/api/update-data', (req, res) => {
  const params = req.query
  console.log(params)
  walletService.update(params.dbName, params.data)
    .then((data) => {
      console.log(data, 'app-console Количество монет')
      res.send(data)
    })
    .catch(err => {
      console.log('Error:', err)
      res.status(400).send('Cannot add data')
    })
})
app.get('/api/remove-data', (req, res) => {
  const params = req.query
  console.log(params)
  walletService.remove(params.dbName, params.id)
    .then((data) => {
      console.log(data, 'app-console Количество монет')
      res.send(data)
    })
    .catch(err => {
      console.log('Error:', err)
      res.status(400).send('Cannot add data')
    })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
