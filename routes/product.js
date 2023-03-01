var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const { body } = require('express-validator');

const passportJWT = require('../middleware/passportJWT');
const checkAdmin = require('../middleware/checkAdmin');

router.post('/productadd', [passportJWT.isLogin, checkAdmin.isAdmin,
    body('p_id').trim().not().isEmpty().withMessage("Please enter serial number. / โปรดใส่รหัสของสินค้า"),
    body('p_name').trim().not().isEmpty().withMessage("Please enter product's name. / โปรดใส่ชื่อของสินค้า"),
    body('p_type').trim().not().isEmpty().withMessage("Please enter product's type. / โปรดใส่ประเภทของสินค้า"),
    body('p_price').trim().not().isEmpty().withMessage("Please enter product's price. / โปรดใส่ราคาของสินค้า"),
    body('p_brand').trim(),
], productController.addProduct);

router.post('/brandadd', [passportJWT.isLogin, checkAdmin.isAdmin,
    body('p_brand').trim().not().isEmpty().withMessage("Please enter brand's name. / โปรดใส่ชื่อแบรนด์")
], productController.addbrand);

router.get('/productdetail', productController.getProduct);

router.get('/branddetail', productController.getBrand);

router.get('/', productController.getBrandProduct);

router.delete('/productdelete', [passportJWT.isLogin, checkAdmin.isAdmin], productController.deleteProduct);

router.delete('/branddelete', [passportJWT.isLogin, checkAdmin.isAdmin], productController.deleteBrand);
  
module.exports = router;
