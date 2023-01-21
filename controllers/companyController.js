
const Company = require('../model/company')


exports.index = async(req,res,next) => {

const company =await Company.find()

    res.status(200).json({
        haha:company
    })
}

exports.insert = async(req,res,next) => {

    const {name,address:{province}} = req.body
   
    let company = new Company({
        name: name,
        address:{province}
    });

    await company.save()
    
        res.status(200).json({
            message:'เพิ่มข้อมูลเรียบแล้ว',
        })
    }

    exports.delete = async(req,res,next) => {

        try{
         const {id}=req.params
         const company =await Company.deleteOne({_id:id})
         
         if (company.deleteCount === 0){
         const error = new Error("ไม่สามารถลบข้อมูลได้ / ไม่พบข้อมูลผู้ใช้งาน");
         error.statusCode = 400;
         throw error;
         }
             
        }catch(error){
            next(error);
        }
     }

     exports.update = async(req,res,next) => {

        try{
            const {id}=req.params
            const {name,address:{province}} = req.body
          

            const company = await Company.updateOne({_id:id},{
                name:name,
                address:{province: province}
            })
            if(!company){ 
            const error = new Error("ไม่พบข้อมูล");
            error.statusCode = 400;
            throw error;}
             
        }catch(error){
            next(error);
        }
     }