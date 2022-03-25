const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-type-email');

// Create Schema
const BuyersSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: mongoose.SchemaTypes.Email,
		required: true,
		unique: true
	},
	password:{
		type: String,
		required: true
	},
	contact_number:{
		type: String,
		required: true,
		length: 10
	},
	age: {
		type: Number,
		required: true
	},
	batch_name: {
		type: String,
		required: true
	},
	occupation: {
		type: String,
		requierd: true 
	},
	wallet: {
		type: Number,
		required: true,
		default: 0
	}
},
{
    timestamps: true, // auto timestamp added
});

module.exports = Buyers = mongoose.model("Buyers", BuyersSchema);
