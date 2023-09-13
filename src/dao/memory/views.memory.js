import {
	validatePage,
	validateLimit,
	validateSort,
	validateQuery,
	multiply,
	getTotal,
	memoryCart
} from '../../utils/functions.utils.js';

import productDAO from './products.memory.js';
import cartsDAO from './carts.memory.js';

class ViewsMemoryDAO {
	constructor() {
		this.data = [];
		this.products = productDAO.getProductsDao();
		this.carts = cartsDAO.getCartsDao();
	}

	getHomeDao(req, res) {
		try {
			const cart = memoryCart(req, res);
			const { user } = req.session;

			const payload = {
				header: true,
				user,
				cart,
				style: 'home.css',
				documentTitle: 'Home',
			}
			return payload;
		} catch (error) {
			return `${error}`;
		}
	}

	getLoginDao() {
		try {
			const payload = {
				header: false,
				style: 'login.css',
				documentTitle: 'Login',
			}
			return payload;
		} catch (error) {
			return `${error}`;
		}
	}

	getRegisterDao() {
		try {
			const payload = {
				header: false,
				style: 'register.css',
				documentTitle: 'Register',
			}
			return payload;
		} catch (error) {
			return `${error}`;
		}
	}

	async getChatDao(req, res) {
		try {
			const { user } = req.session;
			const payload = {
				header: true,
				user,
				style: 'chat.css',
				documentTitle: 'Chat',
			}
			return payload;
		} catch (error) {
			return `${error}`;
		}
	}

	getProductsDao(req, res) {
		try {
			const cart = memoryCart(req, res);
			const { user } = req.session;
			const products = this.products;
			let { limit, page, query, sort } = req.query;

			page = validatePage(page);
			limit = validateLimit(limit);
			sort = validateSort(sort);
			query = validateQuery(query);

			if (products.length < 1) return `No products found for this search`;
	
			if (sort === 'asc') {
				products.sort((a, b) => a.price - b.price);
			} else {
				products.sort((a, b) => b.price - a.price);
			}

			const payload = {
				status: 'success',
				header: true,
				payload: products,
				user,
				page,
				limit,
				query,
				sort,
				cart,
				documentTitle: 'Products',
				style: 'products.css',
			}
			return payload;
		} catch (error) {
			return `${error}`;
		}
	}

	getProductDao(req, res) {
		try {
			const cart = memoryCart(req, res);
			const products = this.products;
			const { pid } = req.params;

			const product = products.find(product => product._id == pid);
			if (!product) return `No product found with ID '${pid}'`;

			const payload = {
				header: true,
				product,
				cart,
				style: 'product.css',
				documentTitle: 'Product',
			}
			return payload;
		} catch (error) {
			return `${error}`;
		}
	}

	async getCartDao(req, res) {
		try {
			const cart = memoryCart(req, res);
			const carts = this.carts;
			const products = this.products;

			const existCart = carts.find(item => item._id == cart);
			if (!existCart) return `No cart found with ID '${cart}'`;

			existCart.products.forEach(product => {
				const productInfo = products.find(item => item._id == product._id);
				if (productInfo) Object.assign(product, { ...productInfo });
			});

			const payload = {
				header: true,
				cart,
				style: 'cart.css',
				documentTitle: 'Cart',
				helpers: {
					multiply,
					getTotal
				},
				payload: existCart.products,
			}
			return payload;
		} catch (error) {
			return `${error}`;
		}
	}
}

const MemoryDAO = new ViewsMemoryDAO();
export default MemoryDAO;




