const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)
const { validationResult } = require("express-validator");

const { Error } = require('mongoose')
const staff = require('../model/staff')
const Staff = require('../model/staff')
const config = require('../config/index')

exports.index = async(req,res,next) => {

   try{
    const {id}=req.params
    const staff =await Staff.find()

    const staffe = staff.map((staff,index)=>{ 
        return{
            id:staff._id,
            name:staff.name,
            photo:config.IMG_SHOP+staff.photo,
            
        }
     })
    
    if(!staff){
        const error = new Error("ไม่พบผู้ใช้งาน");
        error.statusCode = 400;
        throw error;
    }

        res.status(200).json({
            data:staffe
        })
        
   }catch(error){
    next(error);
   }
}

exports.update = async(req,res,next) => {

    try{
        const {id}=req.params
        const {name,salary} = req.body

        //const staff = await Staff.findById(id)
        // staff.name=name
        // staff.salary=salary
        // await staff.save()  
        
        //const staff =await Staff.findByIdAndUpdate(id,{
        //    name:name,
        //    salary:salary
        //})
        
        const staff = await Staff.updateOne({_id:id},{
            name:name,
            salary:salary
        })
        
        console.log(staff)
        
            res.status(200).json({
                message:'เพิ่มข้อมูลเรียบแล้ว',
            })
         
    }catch(error){
        next(error);
    }
 }

exports.delete = async(req,res,next) => {

    try{
     const {id}=req.params
     const staff =await Staff.deleteOne({_id:id})
     
     if (staff.deleteCount === 0){
     const error = new Error("ไม่สามารถลบข้อมูลได้ / ไม่พบข้อมูลผู้ใช้งาน");
     error.statusCode = 400;
     throw error;
     }

     console.log(staff)
         
    }catch(error){
        next(error);
    }
 }

exports.show = async(req,res,next) => {

    try{
     const {id}=req.params
     const staff =await Staff.findOne({
         _id:id
     })
     
     if(!staff){
        const error = new Error("ไม่พบผู้ใช้งาน");
        error.statusCode = 400;
        throw error;
     }
 
         res.status(200).json({
             data:staff
         })
         
    }catch(error){
        next(error);
    }
 }

exports.insert = async(req,res,next) => {
    try {
      const { name, salary, photo } = req.body;
      // Validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("Input is incorrect");
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
      }
      const photoName = photo ? await saveImageToDisk(photo) : undefined;
      let staffinsert = staff({
        name: name,
        salary: salary,
        photo: photoName,
      });
      const result = await staffinsert.save();
      return res
        .status(200)
        .json({ message: `Insert Successful: ${result != null}` });
    } catch (e) {
      next(e);
    }
  };
    
    function decodeBase64Image(base64Str) {
        var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        var image = {};
        if (!matches || matches.length !== 3) {
            throw new Error('Invalid base64 string');
        }
    
        image.type = matches[1];
        image.data = matches[2];
    
        return image;
    }