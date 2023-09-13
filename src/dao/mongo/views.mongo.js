import { productModel } from './models/product.model.js';
import { cartModel } from './models/cart.model.js';
import {
	validatePage,
	validateLimit,
	validateSort,
	validateQuery,
	multiply,
	getTotal,
	mongoCart,
} from '../../utils/functions.utils.js';

class ViewsMongoDAO {
	constructor() {}

	async getHomeDao(req, res) {
		try {
			const cart = await mongoCart(req, res);
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

	async getLoginDao() {
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

	async getRegisterDao() {
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

	async getProductsDao(req, res) {
		try {
			const cart = await mongoCart(req, res);
			const { user } = req.session;
			let { limit, page, query, sort } = req.query;

			page = validatePage(page);
			limit = validateLimit(limit);
			sort = validateSort(sort);
			query = validateQuery(query);

			const options = {
				page,
				limit,
				customLabels: {
					totalPages: 'totalPages',
					hasPrevPage: 'hasPrevPage',
					hasNextPage: 'hasNextPage',
					prevPage: 'prevPage',
					nextPage: 'nextPage',
					docs: 'data',
				},
				lean: true,
			};
	
			const products = await productModel.paginate(query, options);
			
			if (products.data.length < 1) return `No products found for this search`;
	
			if (sort === 'asc') {
				products.data.sort((a, b) => a.price - b.price);
			} else {
				products.data.sort((a, b) => b.price - a.price);
			}

			const payload = {
				status: 'success',
				header: true,
				payload: products.data,
				user,
				page,
				limit,
				query,
				sort,
				cart,
				totalPages: products.totalPages,
				hasPrevPage: products.hasPrevPage,
				hasNextPage: products.hasNextPage,
				prevPage: products.prevPage,
				nextPage: products.nextPage,
				documentTitle: 'Products',
				style: 'products.css',
			}
			return payload;
		} catch (error) {
			return `${error}`;
		}
	}

	async getProductDao(req, res) {
		try {
			const cart = await mongoCart(req, res);
			const { pid } = req.params;

			const product = await productModel.findById(pid).lean();

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
			const { cid } = req.params;
			const cart = await cartModel.findById(cid).populate('products._id').lean();
			if (!cart) return `No cart found with ID '${cid}'`;

			const payload = {
				header: true,
				cart: cid,
				style: 'cart.css',
				documentTitle: 'Cart',
				helpers: {
					multiply,
					getTotal
				},
				payload: cart.products,
			}
			return payload;
		} catch (error) {
			return `${error}`;
		}
	}
}

const MongoDAO = new ViewsMongoDAO();
export default MongoDAO;
