const mongoose = require("mongoose");

const Schema = mongoose.Schema

const shopSchema = new Schema({
    name:  {type:String ,require:true,trim:true},
    photo: {type:String ,default:'nopic.png'},
    location:{
            lat:Number,
            lgn:Number}, 
    // createdat , updatedat ไม่ต้องประกาศ
    
  },{timestamps:true,
     collection:"shops"}); //ต้องตรงกันกับฐานข้อมูล

  const shop = mongoose.model("Shop",shopSchema)
  
  module.exports = shop