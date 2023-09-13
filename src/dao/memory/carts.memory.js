import logger from '../../utils/logger.util.js';
import productDAO from './products.memory.js';
import { faker } from '@faker-js/faker/locale/es';

class CartsMemoryDAO {
	constructor() {
		this.data = [];
		this.products = productDAO.getProductsDao();
	}

	getCartsDao() {
		try {
			const carts = this.data;
			if (!carts) return `No carts found`;
			return carts;
		} catch (error) {
			return `${error}`;
		}
	}

	getCartDao(cid) {
		try {
			const carts = this.data;
			const cart = carts.find((cart) => cart._id == cid);
			if (!cart) return `No cart found with ID '${cid}'`;
			return cart;
		} catch (error) {
			return `${error}`;
		}
	}

	createCartDao(cart) {
		try {
			const carts = this.data;
			const newId = faker.database.mongodbObjectId();

			const newCart = {
				_id: newId,
				...cart,
			};
			carts.push(newCart);

			if (!newCart) return `No cart was created`;
			return newCart;
		} catch (error) {
			return `${error}`;
		}
	}

	createProductDao(cid, pid) {
		try {
			const carts = this.data;
			const cart = carts.find((cart) => cart._id == cid);
			if (!cart) return `No cart found with ID '${cid}'`;

			const products = this.products;
			const product = products.find((product) => product._id == pid);
			if (!product) return `No product found with ID '${pid}'`;

			const productInCart = cart.products.find((product) => product._id == pid);
			if (productInCart) {
				productInCart.quantity += 1;
			} else {
				const newProduct = {
					_id: pid,
					quantity: 1,
				};
				cart.products.push(newProduct);
			}

			return cart;
		} catch (error) {
			return `${error}`;
		}
	}

	updateCartDao(cid, newCart) {
		try {
			const carts = this.data;
			const cart = carts.find((cart) => cart._id == cid);
			if (!cart) return `No cart found with ID '${cid}'`;

			const products = this.products;

			newCart.forEach((product) => {
				if (product.quantity < 1) {
					logger.warn(
						`Product '${product._id}' has an invalid value of quantity. Receive '${product.quantity}', new value was setted on '1'`
					);
					product.quantity = 1;
				}

				const existProduct = products.find((item) => item._id == product._id);

				if (existProduct && existProduct.stock < product.quantity) {
					product.quantity = existProduct.stock;
					logger.warn(
						`Insuficient stock for product '${product._id}', new quantity setted on max stock: '${existProduct.stock}'`
					);
				}

				if (existProduct && existProduct.stock >= product.quantity) {
					const productInCart = cart.products.find(
						(item) => item._id == product._id
					);

					if (!productInCart) {
						const newProduct = {
							_id: product._id,
							quantity: product.quantity,
						};
						cart.products.push(newProduct);
					} else {
						productInCart.quantity = product.quantity;
					}
				}
			});

			return cart;
		} catch (error) {
			return `${error}`;
		}
	}

	updateProductDao(cid, pid, newQuantity) {
		try {
			const carts = this.data;
			const cart = carts.find((cart) => cart._id == cid);
			if (!cart) return `No cart found with ID '${cid}'`;

			const products = this.products;
			const product = products.find((product) => product._id == pid);
			const productIndex = products.findIndex((item) => item._id == pid);
			if (!product) return `No product found with ID '${pid}'`;

			const productInCart = cart.products.find((item) => item._id == pid);
			if (!productInCart)
				return `No product with ID '${pid}' was found in cart '${cid}'`;

			if (newQuantity > product.stock) {
				newQuantity = product.stock;
				logger.warn(`Insuficient stock, new quantity setted on max stock: '${newQuantity}'`)
			}
			cart.products[productIndex].quantity = newQuantity;

			return cart;
		} catch (error) {
			return `${error}`;
		}
	}

	deleteCartDao(cid, newCart) {
		try {
			const carts = this.data;
			const cart = carts.find((cart) => cart._id == cid);
			if (!cart) return `No cart found with ID '${cid}'`;

			const cartIndex = carts.findIndex((cart) => cart._id == cid);
			if (cartIndex !== -1) carts.splice(cartIndex, 1, newCart);

			return carts[cartIndex];
		} catch (error) {
			return `${error}`;
		}
	}

	deleteProductDao(cid, pid) {
		try {
			const carts = this.data;
			const cart = carts.find((cart) => cart._id == cid);
			if (!cart) return `No cart found with ID '${cid}'`;

			const products = this.products;
			const product = products.find((product) => product._id == pid);
			if (!product) return `No product found with ID '${pid}'`;

			const productInCart = cart.products.find((item) => item._id == pid);
			if (!productInCart)
				return `No product with ID '${pid}' was found in cart '${cid}'`;

			const cartIndex = cart.products.findIndex(
				(product) => product._id == pid
			);
			if (cartIndex !== -1) cart.products.splice(cartIndex, 1);

			return cart;
		} catch (error) {
			return `${error}`;
		}
	}

	async purchaseCartDao(cid) {
		try {
			return;
		} catch (error) {
			return `${error}`;
		}
	}
}

const MemoryDAO = new CartsMemoryDAO();
export default MemoryDAO;
