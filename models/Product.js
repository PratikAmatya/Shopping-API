const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	productName: {
		type: String,
		required: [true, 'Please enter the product name'],
		trim: true,
		unique: true,
		minLength: [3, 'Minimum length of the product should be 3'],
	},
	description: {
		type: String,
		required: [true, 'Please enter the product description'],
		trim: true,
		minLength: [10, 'Minimum length of the product description should be 10'],
	},
	price: {
		type: Number,
		required: [true, 'Please enter the price of the product'],
		trim: true,
	},
	quantity: {
		type: Number,
		required: [true, 'Please enter the total quantity in stock'],
		trim: true,
	},
});

module.exports = mongoose.model('Product', ProductSchema);
