const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const productRoute = require('./routes/product');
const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user');
const orderRoute = require('./routes/order');

// Setting view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Data Parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// middleware
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('tiny'));
app.use(cookieParser());

dotenv.config({ path: 'config.env' });

const PORT = process.env.PORT || 5000;

// Connect to DB
const DB_CONNECTION = process.env.DB_CONNECTION.replace(
	'<password>',
	process.env.DB_PASSWORD
);

// Connect to DB
mongoose.connect(
	DB_CONNECTION,
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
	(err) => {
		if (err) {
			console.log('ERROR OCCURED:' + err);
		} else {
			console.log('DB Connection Succesful');
		}
	}
);

app.use('/order', orderRoute);
app.use('/product', productRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);

app.use((req, res) => {
	res.json({ message: 'Page Not Found' });
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));
