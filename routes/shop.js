var express = require('express');
var router = express.Router();
const shopcontroller = require('../controllers/shopcontroller')
const { body } = require("express-validator");

router.get('/',shopcontroller.index);

router.get('/menu',shopcontroller.menu);

router.get('/:id',shopcontroller.id);

router.post('/',
[
    body("name").not().isEmpty().withMessage("กรุณาป้อนชื่อสกุลด้วย"),
    body("location").not().isEmpty().withMessage("กรุณาป้อนสถานที่ด้วย"),
    body("location.lat").isNumeric().withMessage("กรุณากรอกเป็นตัวเลข"),
    body("location.lgn").isNumeric().withMessage("กรุณากรอกเป็นตัวเลข")
]
, shopcontroller.insert);


module.exports = router;