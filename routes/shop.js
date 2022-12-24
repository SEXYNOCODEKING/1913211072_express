var express = require('express');
var router = express.Router();
const shopcontroller = require('../controllers/shopcontroller')

router.get('/',shopcontroller.index);

router.get('/menu',shopcontroller.menu);


module.exports = router;