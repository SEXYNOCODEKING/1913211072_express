var express = require('express');
var router = express.Router();
const companycontroller = require('../controllers/companyController')

router.get('/',companycontroller.index);



/*router.get('/', function(req, res, next) {
    res.status(200).json({ data : [
        {id:1,
        name : "NOCODE Company",
         address : {
            province:"Thai",
            Postalcode:10200
        }},
        {name:"GET Me RICH",
        address : {
            province:"Thai",
            Postalcode:10200
        }},
        {name:"P.KarnCode",
        address : {
            province:"Thai",
            Postalcode:10200
        }}]
    })
  })
*/


module.exports = router;