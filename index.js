const express = require('express');
const imageProcessor = require('./backend/imageProcessingService.js');
const waitUntil = require('wait-until');
const hbs = require('hbs');
const download = require('image-downloader');
const port = 3000;

var app = express();

// setting up the view engine to be handlebars
app.set('view engine', 'hbs');

// middleware giving access to the public directory
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
      res.render('home');
});

app.get('/downloadPic', (req, res) => {
  var imageUrl = req.query.url;

  const options = {
    url: imageUrl,
    dest: './res/test-images/currentPic.jpg'
  }

  download.image(options)
  .then(({ filename, image }) => {
    console.log('File saved to', filename)

    var labelResults = imageProcessor.detectImageLabels(options.dest);
    var faceResults = imageProcessor.detectFaces(options.dest);
    var imageProperties = imageProcessor.detectImageColorProperties(options.dest);

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
         res.send({
           labels: labelResults,
           faces: faceResults,
           properties: imageProperties
         })
       })

  }).catch((err) => {
    throw err
  })
})

app.listen(port, () => {
  console.log(`Server up and running on port ${port}!`);
});
