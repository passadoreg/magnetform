const express = require('express');

const fs = require('fs');
//const readline = require('readline');
const router = express.Router();
const magnetFile = 'sample.txt';
var magnetFileData = [];

function readMagnet() {
    console.log('readMagnet');
    //return fs.readFileSync(magnetFile);
    magnetFileData.length = 0;
    magnetFileData = fs.readFileSync(magnetFile, 'utf8');
    magnetFileData = magnetFileData.split('\n').filter(Boolean);
    console.log(magnetFileData);
}

router.get('/', (req, res) => {
  readMagnet();
  //console.log(magnetFileData);
  res.render('form', { title: 'Magnet Manager', magnetData:  magnetFileData });
});

router.post('/', (req, res) => {
  //console.log(req.body.magnet);
  fs.appendFileSync(magnetFile, req.body.magnet + '\r\n', function (err) {
    if (err) return console.log(err);
    console.log('New magnet added');
  });
  readMagnet();
  //console.log(magnetFileData);
  res.render('form', { title: 'Magnet Manager', magnetData:  magnetFileData});
});

module.exports = router;
