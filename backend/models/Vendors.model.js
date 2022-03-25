const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-type-email');

// Create Schema
const VendorsSchema = new Schema({
	manager_name: {
		type: String,
		required: true
	},
    shop_name: {
        type: String,
        required: true,
        unique: true
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
	canteen_opening_time: {
        type: String,
        required: true
    },
    canteen_closing_time: {
        type: String,
        required: true
    },
	occupation: {
		type: String,
		requierd: true 
	}
},
{
    timestamps: true, // auto timestamp added
});

module.exports = Vendors = mongoose.model("Vendors", VendorsSchema);
