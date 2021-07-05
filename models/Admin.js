const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { isEmail } = require('validator');

const AdminSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Please enter an email'],
		trim: true,
		unique: true,
		lowercase: true,
		validate: [isEmail, 'Please enter a valid email'],
	},
	password: {
		type: String,
		required: [true, 'Please enter a password'],
		trim: true,
		minlength: [6, 'Minimum password length is 6 characters'],
	},
});

// fire a function before doc is saved to db
AdminSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// static method to login admin
AdminSchema.statics.login = async function (email, password) {
	const admin = await this.findOne({ email });
	if (admin) {
		// Comparing passwords
		const auth = await bcrypt.compare(password, admin.password);
		if (auth) {
			return admin;
		}
		throw Error('Incorrect Password');
	}
	throw Error('Incorrect Email');
};

module.exports = mongoose.model('Admin', AdminSchema);
