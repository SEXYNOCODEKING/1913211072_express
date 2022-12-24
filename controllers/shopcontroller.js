
const { Error } = require('mongoose')
const Shop = require('../model/shop')

exports.index = async(req,res,next) => {

    try{
     const {id}=req.params
     const shop =await Shop.find()
     
     if(!shop){
         throw new Error('ไม่พบผู้ใช้งาน')
     }
 
         res.status(200).json({
             data:shop
         })
         
    }catch(error){
         res.status(400).json({
             error:"เกิดข้อผิดพลาด : " + error.message
          })
    }
 }