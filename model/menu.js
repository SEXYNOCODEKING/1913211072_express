const mongoose = require("mongoose");
const { schema } = require("./company");


const Schema = mongoose.Schema

const menuSchema = new Schema({
    name:{type:String,require:true,trim:true},
    price:{type:Number},
    shop:{type:Schema.Types.ObjectId, ref:'Shop'},
    
    
  },{timestamps:true, // stamp time
     toJSON:{virtuals:true},
     collection:"menus"}); //ต้องตรงกันกับฐานข้อมูล


     menuSchema.virtual('price_vat').get(function () {
        return (
            (this.price * 0.07) + this.price
        )
    }) // สร้าง field เสมือน



  

  const menu = mongoose.model("Menu",menuSchema)
  
  module.exports = menu