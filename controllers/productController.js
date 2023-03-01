const Brand = require("../model/brand");
const Product = require("../model/product")
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config/index')

exports.getBrand = async (req, res, next) => {
    try {
      const data = await Brand.find();
      res.status(200).json({
        Data: data
      })
    } catch (error) {
      next(error);
    }
  };

  exports.getProduct = async (req, res, next) => {

    try {
        const data = await Product.find();
        res.status(200).json({
        Data:data
        })
      } catch (error) {
        next(error);
      }
    
};

exports.getBrandProduct = async (req, res, next) => {

    const data = await Brand.find().populate('product')
    res.status(200).json({
        data: data
    })

}


exports.deleteProduct = async (req, res, next) => {

    try{
        const {product_id} = req.body

        const product = await Product.deleteOne({product_id : product_id});

        if(product.deletedCount === 0){
            const error = new Error('cannot find this Product / ไม่พบข้อมูลสินค้านี้')
            error.statusCode = 400
            throw error;
        }else {
            return res.status(200).json({
                message: 'Data deleted. / ลบข้อมูลเรียบร้อยแล้ว',
            });
        }

    } catch(error){
        next(error)
    }
}

exports.deleteBrand = async (req, res, next) => {

    try{
        const {product_brand} = req.body

        const brand = await Brand.deleteOne({product_brand : product_brand});

        if(brand.deletedCount === 0){
            const error = new Error('cannot find this Brand / ไม่พบข้อมูลแบรนด์นี้')
            error.statusCode = 400
            throw error;
        }else {
            return res.status(200).json({
                message: 'Data deleted. / ลบข้อมูลเรียบร้อยแล้ว',
            });
        }

    } catch(error){
        next(error)
    }
}

exports.addProduct = async (req, res, next) => {
    try{
    const {product_id, product_name, product_brand, product_type,product_price} = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Received information is error. / ข้อมูลผิดพลาด")
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
    }
    
    const existid = await Product.findOne({product_id : product_id});
    if(existid){
        const error = new Error("This Serial number is already in the system. / รหัสสินค้านี้มีในระบบอยู่แล้ว")
        error.statusCode = 400;
        throw error;
    }

    const existbr = await Brand.findOne({product_brand : product_brand});

    if(!existbr){
        const error = new Error("This brand is not in the system. / แบรนด์นี้มีใม่อยู่ในระบบ")
        error.statusCode = 400;
        throw error;
    }
    

    let product = new Product;
    product.product_id = product_id
    product.product_name = product_name
    product.product_type = product_type
    product.product_price = product_price
    product.product_brand = product_brand

    await product.save()
    res.status(200).json({
        message: "succeeded / เพิ่มสินค้าเข้าในระบบเรียบร้อยแล้ว"
    })
    } catch (error){
    next(error)
    }
}

exports.addbrand = async (req, res, next) => {
    try{
    const {product_brand} = req.body

    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Received information is error. / ข้อมูลผิดพลาด")
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
    }
    
    const existid = await Brand.findOne({product_brand : product_brand});

    if(existid){
        const error = new Error("This brand is already in the system. / แบรนด์นี้มีในระบบอยู่แล้ว")
        error.statusCode = 400;
        throw error;
    }

    let brand = new Brand;
    brand.product_brand = product_brand

    await brand.save()
    res.status(200).json({
        message: "succeeded / เพิ่มแบรนด์เข้าในระบบเรียบร้อยแล้ว"
    })
    } catch (error){
    next(error)
    }
}

//get product info
exports.getProduct = async (req, res, next) => {

    const pdata = await Product.find();
    res.status(200).json({
        data:pdata
    })
}