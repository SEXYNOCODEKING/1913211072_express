var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const { body } = require('express-validator');
const passportJWT=require('../middleware/passportJWT')

/* GET users listing. */
router.get('/',userController.index );

router.get('/bio',userController.bio);

router.post('/',[
    body('name').not().isEmpty().withMessage("กรุณาพิมพ์ชื่อ-สกุล"),
    body('email').not().isEmpty().withMessage("กรุณาพิมพ์อีเมล์").isEmail().withMessage("รูปแบบอีเมล์ไม่ถูกต้อง"),
    body('password').not().isEmpty().withMessage("กรุณากรอกรหัสผ่าน").isLength({min:5}).withMessage("รหัสผ่านต้อง 5 ตัวอักษรขึ้นไป")

],userController.register);

router.post(
    "/login",
    [
      body("email")
        .not()
        .isEmpty()
        .withMessage("กรุณาป้อนอีเมลด้วย")
        .isEmail()
        .withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
      body("password")
        .not()
        .isEmpty()
        .withMessage("กรุณาป้อนรหัสผ่านด้วย")
        .isLength({ min: 5 })
        .withMessage("รหัสผ่านต้องมีอย่างน้อย 5 ตัวอักษร"),
    ],
    userController.login
  );

  router.get('/me',[passportJWT.isLogin],userController.profile)

module.exports = router;
