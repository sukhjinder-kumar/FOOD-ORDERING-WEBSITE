const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({

    item_name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    vendor_id: {
        type: String,
        required: true
    },
    buyer_id: {
        type: String,
        required: true
    },
    food_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    add_on: {
        type: [{food_add_on: String , price: Number}],
    }
},
{
    timestamps: true,
});

module.exports = Orders = mongoose.model("Orders", OrderSchema)