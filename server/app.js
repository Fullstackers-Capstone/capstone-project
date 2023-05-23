const express = require('express');
const app = express();
const path = require('path');
app.use(express.json({limit: '50mb'}));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

app.get('/', (req, res) => {
    res.render(
      path.join(__dirname, '../static/index.html'),
      { client_id : process.env.client_id });
  }); 

app.use('/api/auth', require('./api/auth'));

module.exports = app;
