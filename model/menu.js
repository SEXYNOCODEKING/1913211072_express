const mongoose = require("mongoose");


const Schema = mongoose.Schema

const menuSchema = new Schema({
    name:{type:String,require:true,trim:true},
    price:{type:Number},
    shop:{type:Schema.Types.ObjectId, ref:'Shop'}
    
  },{timestamps:true,
     collection:"menus"}); //ต้องตรงกันกับฐานข้อมูล

  const menu = mongoose.model("Menu",menuSchema)
  
  module.exports = menu