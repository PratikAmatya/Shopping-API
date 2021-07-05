const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: [true, 'UserID is required'],
		trim: true,
	},
	deliveryAddress: {
		type: String,
		required: [true, 'Delivery Address is required'],
		trim: true,
		minLength: [8, 'Minimum length of the product should be 3'],
	},
	totalPrice: {
		type: Number,
		required: [true, 'Total price is required'],
	},
	cart: {
		type: Array,
		required: [true, 'Cart cannot be empty'],
	},
	orderDate: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Order', OrderSchema);
