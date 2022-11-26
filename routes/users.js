var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('MCU');
  res.status(200).json({
    full_name:'Thanawat Prapassuwan'
   })
});

router.get('/bio', function(req, res, next) {
  //res.send('MCU');
  res.status(200).json({
    full_name:'Thanawat Prapassuwan',
    nickname:'NOCODEKING',
    hobby:'NOCODING',
    gitusername:"SEXYNOCODEKING"
   })
});

module.exports = router;
