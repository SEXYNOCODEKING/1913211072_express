
const { Error } = require('mongoose')

const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)

const Shop = require('../model/shop')
const Menu = require('../model/menu')
const config = require('../config/index')
const { validationResult } = require("express-validator");



exports.index = async(req,res,next) => {

    
     const shops =await Shop.find().select('name photo location').sort({_id:-1})
     
     const shopWithPhotoDomain = shops.map((shop,index)=>{ 
        return{
            id:shop._id,
            name:shop.name,
            photo:config.IMG_SHOP+shop.photo,
            location:shop.location,
        }
     })
    
         res.status(200).json({
             data:shopWithPhotoDomain
         })
         
            
        }
exports.menu = async (req, res, next) => {

    //  const menu = await Menu.find().select('+name').where('Price').gt(200)
    const menu = await Menu.find().populate('shop')

    res.status(200).json({
              data: menu
    })
}

exports.id = async (req, res, next) => {
    const {id}=req.params
    const menu = await Shop.find({_id: id}).populate('menu')
    res.status(200).json({
              data: menu
    })
}

exports.insert = async(req,res,next) => {
    try {
      const { name, location, photo } = req.body;
      // Validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error("Input is incorrect");
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
      }
      const photoName = photo ? await saveImageToDisk(photo) : undefined;
      let shopinsert = shop({
        name: name,
        location: location,
        photo: photoName,
      });
      const result = await shopinsert.save();
      return res
        .status(201)
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