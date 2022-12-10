const mongoose = require("mongoose");

const Schema = mongoose.Schema

const staffSchema = new Schema({
    name:   {type:String ,require:true,trim:true},
    salary: {type:Number}, //long ver.
    created:{type:Date,default:Date.now}
    
  },{collection:"staffs"}); //ต้องตรงกันกับฐานข้อมูล

  const staff = mongoose.model("Staffs",staffSchema)
  
  module.exports = staff