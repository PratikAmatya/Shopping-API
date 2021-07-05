const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAdminAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	// Check if the json web token exists and is verified
	if (token) {
		jwt.verify(token, process.env.SUPERSECRETKEY, (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.redirect('/admin');
			} else {
				next();
			}
		});
	} else {
		res.redirect('/admin');
	}
};

const requireUserAuth = async (req, res, next) => {
	const { userId } = req.body;
	console.log(userId);
	if (userId) {
		const user = await User.findById(userId);
		if (user) {
			next();
		} else {
			res.status(400).json({ error: 'User Validation Failed' });
		}
	}
};

module.exports = { requireAdminAuth, requireUserAuth };
