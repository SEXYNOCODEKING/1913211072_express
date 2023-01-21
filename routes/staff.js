var express = require('express');
var router = express.Router();
const staffcontroller = require('../controllers/staffcontroller')
const { body } = require("express-validator");

router.get('/',staffcontroller.index);//locahost/3000/id

router.get('/:id',staffcontroller.show);

router.put('/:id',staffcontroller.update);

router.post('/' ,
[
    body("name").not().isEmpty().withMessage('กรุณาป้อนชื่อสกุลด้วย'),
    body("salary").not().isEmpty().withMessage("กรุณาป้อนรายได้ด้วย").isNumeric().withMessage('กรุณาป้อนรายได้เป็นตัวเลข')
]
, staffcontroller.insert);

router.delete('/:id',staffcontroller.delete);

module.exports = router;
