var express = require('express');
var router = express.Router();
const staffcontroller = require('../controllers/staffcontroller')

router.get('/',staffcontroller.index);//locahost/3000/id

router.get('/:id',staffcontroller.show);

router.put('/:id',staffcontroller.update);

router.post('/',staffcontroller.insert);

router.delete('/:id',staffcontroller.delete);

module.exports = router;
