const express = require('express');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

var app = express();

function detectImageLabels() {
  var dataResults = [];

  client
    .labelDetection('./res/test-images/dogs.jpg')
    .then(results => {
      const labels = results[0].labelAnnotations;
      labels.forEach(label => {
        dataResults.push(label.description);
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
      return {error: "An error has occured while detected image labels"};
    });
    return dataResults;
  }

function detectFaces() {
  var dataResults = [];
  const request = {image: {source: {filename: './res/test-images/dogs.jpg'}}};

  client
    .faceDetection(request)
    .then(results => {
      const faces = results[0].faceAnnotations;
      dataResults.push(faces.length);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
    return dataResults;
  }

 function detectImageColorProperties() {
    var dataResults = [];

    client
    .imageProperties(`./res/test-images/dogs.jpg`)
    .then(results => {
      const properties = results[0].imagePropertiesAnnotation;
      const colors = properties.dominantColors.colors;
      colors.forEach(color => {
        dataResults.push(color);
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
    return dataResults;
  }

 module.exports = {
  detectImageLabels: detectImageLabels,
  detectFaces: detectFaces,
  detectImageColorProperties: detectImageColorProperties
 }
