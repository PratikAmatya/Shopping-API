const router = require('express').Router();
const productController = require('../controllers/product');
const { requireAdminAuth } = require('../middleware/authMiddleware');

router.get('/', productController.product_get);

router.post('/', requireAdminAuth, productController.product_post);

router.get('/:id', productController.productId_get);

router.put('/:id', requireAdminAuth, productController.productId_put);

router.delete('/:id', requireAdminAuth, productController.productId_delete);

module.exports = router;
