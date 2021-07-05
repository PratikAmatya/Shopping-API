var mongoose = require('mongoose');
const Order = require('../models/Order');

exports.order_get = async (req, res) => {
	try {
		const orders = await Order.find();
		res.json(orders);
	} catch (err) {
		return res
			.status(401)
			.json(JSON.stringify({ error: 'Something Went Wrong!' }));
	}
};

exports.order_post = async (req, res) => {
	try {
		console.log(req.body);
		const { userId, deliveryAddress, totalPrice, cart } = req.body;

		if (!userId || !deliveryAddress || !totalPrice || !cart) {
			return res.status(400).status({ error: 'Empty Parameters Found' });
		}

		await Order.create({
			userId,
			deliveryAddress,
			totalPrice: parseFloat(totalPrice),
			cart,
		});

		return res.status(200).json('The order has been placed successfully.');
	} catch (err) {
		return res.status(400).status({ error: err });
	}
};

exports.orderId_get = async (req, res) => {
	try {
		const order = await Order.findOne({ _id: req.params.id });
		res.status(200).json(order);
	} catch (err) {
		console.log(err);
		res.status(400).status({ error: err });
	}
};
