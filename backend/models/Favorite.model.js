const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    buyer_id: {
        type: String,
        required: true,
    },
    food_id: {
        type: String,
        required: true,
    },
    food_name: {
        type: String,
        required: true
    },
},{
    timestamps: true,
})

module.exports = Favorite = mongoose.model("Favorite", FavoriteSchema)