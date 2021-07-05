const router = require('express').Router();
const {
	requireAdminAuth,
	requireUserAuth,
} = require('../middleware/authMiddleware');

const orderController = require('../controllers/order');

router.get('/', requireAdminAuth, orderController.order_get);

router.get('/:id', orderController.orderId_get);

router.post('/', requireUserAuth, orderController.order_post);

module.exports = router;

