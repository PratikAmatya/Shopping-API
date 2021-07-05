const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Handle errors
const handleErrors = (err) => {
	let errors = { email: '', password: '' };
	console.log('ERROR CODE: ' + err.code);
	console.log('ERROR MESSAGE: ' + err.message);
	// For error handling
	if (err.message === 'Incorrect Email') {
		errors.email = 'The Email is not registered';
	}
	if (err.message === 'Incorrect Password') {
		errors.password = 'The entered Password is incorrect';
	}

	// duplicate error code
	if (err.code === 11000) {
		errors['email'] = 'The provided email is already registered';
	}

	// For validation errors
	if (err.message.includes('user validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

// Create JWT
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, process.env.USERSUPERSECRETKEY, {
		expiresIn: maxAge,
	});
};

exports.login_post = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.login(email, password);
		const token = createToken(user._id);
		res.cookie('userJWT', token, { httpOnly: false, maxAge: maxAge * 1000 });
		res.status(200).json({ user: user._id, userJWT: token });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(404).json({ error: errors });
	}
};

exports.register_post = async (req, res) => {
	try {
		const { email, password } = req.body;
		console.log(req.body);
		const user = await User.create({ email, password });
		const token = createToken(user);
		res.cookie('userJWT', token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(200).json({ user: user._id });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(404).json({ error: errors });
	}
};

