const router = require('express').Router();
const adminController = require('../controllers/admin');
const { requireAdminAuth } = require('../middleware/authMiddleware');

router.get('/', adminController.adminLogin_get);

router.post('/', adminController.adminLogin_post);

router.get('/logout', adminController.adminLogOut_get);

router.get('/product', requireAdminAuth, adminController.adminProduct_get);

router.get(
	'/product/add',
	requireAdminAuth,
	adminController.adminProductAdd_get
);

router.get(
	'/product/:id',
	requireAdminAuth,
	adminController.adminProductId_get
);

router.get('/order', requireAdminAuth, adminController.adminOrder_get);

router.get('/order/:id', requireAdminAuth, adminController.adminOrderId_get);

module.exports = router;
