const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const brandSchema = new Schema({
    brand_name: { type: String, require: true, trim: true }
}, {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: "brand"
})


brandSchema.virtual('product', {
    ref: 'product', 
    localField: '_id',
    foreignField: 'brand_name', 
});

const brand = mongoose.model("Brand", brandSchema);
module.exports = brand;