import express from 'express';
import path from 'path';
//import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import bodyParser from 'body-parser';

/* eslint-disable no-console */

const port = process.env.PORT || 4000;
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function (req, res) {
  res.json([
    { "id": 1, "firstName": "Bob", "lastName": "Smith", "email": "bob@gmail.com" },
    { "id": 2, "firstName": "Tammy", "lastName": "Norton", "email": "tnorton@yahoo.com" },
    { "id": 3, "firstName": "Tina", "lastName": "Lee", "email": "lee.tina@hotmail.com" }
  ]);
})

app.post('/data', function (req, res) {
  var jsonData = req.body || req.data;
  console.log("JSon Data - ", jsonData)
  var returnData = {};

  Object.keys(jsonData).map(key => {
    returnData[`Employee${key}`] = jsonData[key];
  });

  res.send(returnData);
})

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    // open('http://localhost:' + port);
    console.log('server running at http://localhost:' + port);
  }
});
