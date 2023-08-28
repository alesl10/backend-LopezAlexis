import views from './views.router.js';
import sessions from './sessions.router.js';
import products from './products.router.js';
import carts from './carts.router.js';

const router = (app) => {
	app.use('/', views);
	app.use('/api/sessions', sessions);
	app.use('/api/products', products);
	app.use('/api/carts', carts);
};

export default router;
