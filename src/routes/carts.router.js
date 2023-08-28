import { Router } from 'express';
import {
	carts,
	cart,
	createCart,
	addProduct,
	updateCart,
	updateProduct,
	deleteCart,
	deleteProduct,
} from '../controllers/carts.controller.js';

const router = Router();

router.get('/', carts);
router.get('/:id', cart);
router.post('/', createCart);
router.post('/:cid/product/:pid', addProduct);
router.put('/:cid', updateCart);
router.put('/:cid/product/:pid', updateProduct);
router.delete('/:id', deleteCart);
router.delete('/:cid/products/:pid', deleteProduct);

export default router;
