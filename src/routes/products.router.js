import { Router } from 'express';
import {
	product,
	products,
	createProduct,
	updateProduct,
	deleteProduct,
} from '../controllers/products.controller.js';

const router = Router();

router.get('/', products);
router.get('/:id', product);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
