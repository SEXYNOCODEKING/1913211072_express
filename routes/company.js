var express = require('express');
var router = express.Router();
const companycontroller = require('../controllers/companyController')
const passportJWT =require('../middleware/passportJWT')
const checkAdmin=require('../middleware/checkAdmin')

router.get('/',[passportJWT.isLogin,checkAdmin.isAdmin],companycontroller.index);

router.post('/',companycontroller.insert);

router.delete('/:id',companycontroller.delete);

router.put('/:id',companycontroller.update);

module.exports = router;