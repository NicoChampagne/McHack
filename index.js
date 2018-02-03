const express = require('express');
const test = require('./backend/test.js')
const hbs = require('hbs');
const port = 3000;

var app = express();

// setting up the view engine to be handlebars
app.set('view engine', 'hbs');

// middleware giving access to the public directory
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  var testresult = test.testfunction();

  res.render('home', {
    data: testresult
  });
});

app.listen(port, () => {
  console.log(`Server up and running on port ${port}!`);
});
