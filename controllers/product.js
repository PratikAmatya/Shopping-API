const Product = require('../models/Product');

exports.product_get = async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (err) {
		return res.status(401).json({ error: 'Something Went Wrong!' });
	}
};

exports.product_post = async (req, res) => {
	try {
		const { productName, description, price, quantity } = req.body;

		await Product.create({
			productName,
			description,
			price: parseFloat(price),
			quantity: parseFloat(quantity),
		});
		res.status(200).json('The product has been added successfully.');
	} catch (err) {
		res.status(400).status({ error: err });
	}
};

exports.productId_get = async (req, res) => {
	try {
		const product = await Product.findOne({ _id: req.params.id });
		res.json(product);
	} catch (err) {
		res.status(400).status({ error: err });
	}
};

exports.productId_put = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		await product.updateOne({ $set: req.body });
		res.status(200).json('The product has been updated successfully.');
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

exports.productId_delete = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		await product.deleteOne();
		res
			.status(200)
			.json(JSON.stringify({ msg: 'The product has been deleted' }));
	} catch (err) {
		res.status(500).json(JSON.stringify({ error: err }));
	}
};
