var express = require('express');
var router = express.Router();
const staffcontroller = require('../controllers/staffcontroller')

router.get('/',staffcontroller.index);

router.post('/',staffcontroller.insert);

module.exports = router;
