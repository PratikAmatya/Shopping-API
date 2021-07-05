const Admin = require('../models/Admin');

const jwt = require('jsonwebtoken');

// Handle errors
const handleErrors = (err) => {
	let errors = { email: '', password: '' };

	// For error handling
	if (err.message === 'Incorrect Email') {
		errors.email = 'The Email is not registered';
	}
	if (err.message === 'Incorrect Password') {
		errors.password = 'The entered Password is incorrect';
	}

	return errors;
};

// Create JSON Web Token
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
	return jwt.sign({ id }, process.env.SUPERSECRETKEY, { expiresIn: maxAge });
};

exports.adminLogin_get = (req, res) => {
	res.render('adminLogin');
};

exports.adminLogin_post = async (req, res) => {
	try {
		let { email, password } = req.body;
		const admin = await Admin.login(email, password);
		const token = createToken(admin._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(200).json({ admin: admin._id });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ error: errors });
	}
};

exports.adminProduct_get = (req, res) => {
	res.render('adminProduct');
};

exports.adminProductId_get = (req, res) => {
	const productId = req.params.id;
	res.render('adminEditProduct', {
		productId,
	});
};

exports.adminProductAdd_get = (req, res) => {
	res.render('adminProductCreate');
};

exports.adminOrder_get = (req, res) => {
	res.render('adminOrder');
};

exports.adminOrderId_get = (req, res) => {
	res.render('adminOrderDetails');
};

exports.adminLogOut_get = (req, res) => {
	res.cookie('jwt', '', { maxAge: 1 });
	res.redirect('/admin');
};
