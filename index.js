require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const node = process.env.NODE_ENV;
const port = process.env.PORT || 3000;
const http = require('http').Server(app);

// require('module-alias/register');

const moduleAlias = require('module-alias');
moduleAlias.addAliases({
  '@/config': path.join(__dirname, '/src/_core/config'),
  '@/helpers': path.join(__dirname, '/src/_core/helpers'),
  '@/models': path.join(__dirname, '/src/_core/models'),
  '@/controllers': path.join(__dirname, '/src/controllers'),
});

const cors = require('cors');

const dir = path.join(__dirname, 'public');
const routes = require('@/controllers');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(dir));

app.get('/', function (req, res) {
  res.status(200).json({
    error: false,
    message: 'Welcome to Kitabikin Core API',
    data: {},
  });
});

app.use(routes);

http.listen(port, () => {
  console.log('Server ' + node + ' started on port ' + port);
});
