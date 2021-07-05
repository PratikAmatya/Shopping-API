const router = require('express').Router();
const userController = require('../controllers/user');

router.post('/login', userController.login_post);

router.post('/register', userController.register_post);

module.exports = router;
