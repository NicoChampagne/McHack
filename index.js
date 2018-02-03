const express = require('express');
const hbs = require('hbs');
const port = 3000;

var app = express();

// setting up the view engine to be handlebars
app.set('view engine', 'hbs');

// middleware giving access to the public directory
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(port, () => {
  console.log(`Server up and running on port ${port}!`);
});
