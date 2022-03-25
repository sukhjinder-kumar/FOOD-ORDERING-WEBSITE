const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-type-email');

const FoodSchema = new Schema({
    // vendor_email: {
	// 	type: mongoose.SchemaTypes.Email,
	// 	required: true,
	// },
    vendor_id: {
        type: String,
        required: true
    },
    item_name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    rating: {
        type: Number,
        requied: true,
        default: 0,
        min: 0,
        max: 5
    },
    veg: {
        type: Boolean,
        required: true,
    },
    add_on: {
        type: [{food_add_on: String , price: Number}],
    },
    tags: {
        type: [String],
    },
    number_user: {
        type: Number,
        requied: true,
        default: 0
    }
},
{
    timestamps: true,
});

module.exports = Foods = mongoose.model("Foods", FoodSchema)