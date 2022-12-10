
const Staff = require('../model/staff')

exports.index = async(req,res,next) => {

const staff =await Staff.find()

    res.status(200).json({
        data:staff
    })
}

exports.insert = async(req,res,next) => {

    const {name,salary} = req.body
   
    let staff = new Staff({
        name: name,
        salary:salary,
    });

    await staff.save()
    
        res.status(200).json({
            message:'เพิ่มข้อมูลเรียบแล้ว',
        })
    }