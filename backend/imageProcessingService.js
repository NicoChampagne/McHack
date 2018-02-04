const express = require('express');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
// const Canvas = require('canvas');
const fs = require('fs');


var app = express();

function detectImageLabels(img) {
  var dataResults = [];

  client
    .labelDetection(img)
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

function detectFaces(img) {
  var dataResults = [];
  const request = {image: {source: {filename: img}}};

  client
    .faceDetection(request)
    .then(results => {
      const faces = results[0].faceAnnotations;
      dataResults.push(faces.length);

      // addSunGlassesToFaces(faces, img, './res/test-images/sunglassefied.png', Canvas, console => {
      //   console.log('Finished!');
      // });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
    return dataResults;
  }

 function detectImageColorProperties(img) {
    var dataResults = [];

    client
    .imageProperties(img)
    .then(results => {
      const properties = results[0].imagePropertiesAnnotation;
      const colors = properties.dominantColors.colors;
      colors.forEach(color => {
        if(dataResults.length < 2) {
          dataResults.push(color);
        }
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
    return dataResults;
  }


  function addSunGlassesToFaces(faces, inputImage, outputImage, Canvas, callback) {
    fs.readFile(inputImage, (err, image) => {
    if (err) {
      return callback(err);
    }

    var Image = Canvas.Image;
    // Open the original image into a canvas
    var img = new Image();
    img.src = image;
    // var canvas = new Canvas(img.width, img.height);
    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0, img.width, img.height);

    // Now draw boxes around all the faces
    context.strokeStyle = 'rgba(0,255,0,0.8)';
    context.lineWidth = '5';

    faces.forEach(face => {
      context.beginPath();
      let origX = 0;
      let origY = 0;
      face.boundingPoly.vertices.forEach((bounds, i) => {
        if (i === 0) {
          origX = bounds.x;
          origY = bounds.y;
        }
        context.lineTo(bounds.x, bounds.y);
      });
      context.lineTo(origX, origY);
      context.stroke();
    });

    // Write the result to a file
    console.log('Writing to file ' + outputImage);
    var writeStream = fs.createWriteStream(outputImage);
    var pngStream = canvas.pngStream();

    pngStream.on('data', chunk => {
      writeStream.write(chunk);
    });
    pngStream.on('error', console.log);
    pngStream.on('end', callback);
  });
  }

 module.exports = {
  detectImageLabels: detectImageLabels,
  detectFaces: detectFaces,
  detectImageColorProperties: detectImageColorProperties
 }
