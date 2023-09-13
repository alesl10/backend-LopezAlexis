import { Router } from 'express';
import {
	carts,
	cart,
	insertCart,
	insertProduct,
	editCart,
	editProduct,
	clearCart,
	clearProduct,
	purchase,
} from '../controllers/carts.controller.js';

import roleAuth from '../middlewares/role.middleware.js';

const router = Router();

router.get('/', carts);
router.get('/:cid', cart);
router.post('/', roleAuth('admin'), insertCart);
router.post('/:cid/product/:pid', roleAuth('user'), insertProduct);
router.put('/:cid', roleAuth('user'), editCart);
router.put('/:cid/product/:pid', roleAuth('user'), editProduct);
router.delete('/:cid', roleAuth('user'), clearCart);
router.delete('/:cid/product/:pid', roleAuth('user'), clearProduct);
router.post('/:cid/purchase', roleAuth('user'), purchase);

export default router;