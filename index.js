const express = require('express');
const imageProcessor = require('./backend/imageProcessingService.js');
const waitUntil = require('wait-until');
const hbs = require('hbs');
const port = 3000;

var app = express();

// setting up the view engine to be handlebars
app.set('view engine', 'hbs');

// middleware giving access to the public directory
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  var labelResults = imageProcessor.detectImageLabels();
  var faceResults = imageProcessor.detectFaces();
  var imageProperties = imageProcessor.detectImageColorProperties();

  waitUntil()
    .interval(500)
    .times(20)
    .condition(function() {
      return (labelResults.length !== 0 && faceResults.length !== 0 && imageProperties.length !== 0) ? true : false;
    })
    .done(function(result) {
      console.log(labelResults);
      console.log(faceResults);
      console.log(imageProperties);
      res.render('home', {
        labels: labelResults,
        faces: faceResults,
        properties: imageProperties,
        color1: [66, 134, 244],
        color2: [240, 34, 144]
      });
    })
});

app.listen(port, () => {
  console.log(`Server up and running on port ${port}!`);
});
