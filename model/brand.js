const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const brandSchema = new Schema({
    product_brand: { type: String, require: true, trim: true }
}, {
    toJSON: { virtuals: true },
    timestamps: true,
    collection: "brand" 
})


brandSchema.virtual('product', {
    ref: 'product', 
    localField: 'product_brand',
    foreignField: 'product_brand', 
});

const brand = mongoose.model("Brand", brandSchema);
module.exports = brand;