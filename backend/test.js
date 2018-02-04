var express = require('express');
var app = express();

function testfunction() {
  return 'hello everyone';
}

module.exports = {
 testfunction: testfunction,
}
