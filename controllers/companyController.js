
const Company = require('../model/company')


exports.index = async(req,res,next) => {

const company =await Company.find()

    res.status(200).json({
        haha:company
    })
}

exports.insert = async(req,res,next) => {

    const {name,address} = req.body
   
    let company = new Company({
        name: name,
        address:address
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
         
         if (company.deleteCount === 0){throw new Error('ไม่พบข้อมูลผู้ใช้งาน')}
         else{
            res.status(200).json({
                message:'ลบคนนึงเสร็จ'
            })
         }
             
        }catch(error){
             res.status(400).json({
                 error:"เกิดข้อผิดพลาด : " + error.message
              })
        }
     }

     exports.update = async(req,res,next) => {

        try{
            const {id}=req.params
            const {name,address} = req.body
          

            const company = await Company.updateOne({_id:id},{
                name:name,
                address:address
            })
            if(!company){throw new Error('โดน!!!')}else{

                res.status(200).json({
                    message:'เพิ่มข้อมูลเรียบแล้ว',
                })}
             
        }catch(error){
             res.status(400).json({
                 error:"เกิดข้อผิดพลาด : " + error.message
              })
        }
     }