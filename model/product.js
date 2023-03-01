const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    product_id: {type: String, require: true, trim: true, unique: true},
    product_name: {type: String, require: true, trim: true},
    product_type: {type: String, require: true, trim: true, index: true},
    product_brand: {type: String, default: '-', trim: true, ref: 'Brand'},
    product_price: {type: Number, require: true, trim: true}

},
    {
        toJSON: { virtuals: true },
        timestamps: true,
        collection: "Product"
    })

const product = mongoose.model("Product", ProductSchema);
module.exports = product;