import { cartModel } from './models/cart.model.js';
import { productModel } from './models/product.model.js';
import { ticketModel } from './models/ticket.model.js';
import { getAmount } from './../../utils/functions.utils.js';
import UserDTO from '../../dto/user.dto.js';
import sendEmail from '../../utils/email.utils.js';
import logger from '../../utils/logger.util.js';

class CartsMongoDAO {
	constructor() {}

	async getCartsDao() {
		try {
			const carts = await cartModel.find().populate('products._id');
			if (!carts) return `No carts found.`;
			return carts;
		} catch (error) {
			return `${error}`;
		}
	}

	async getCartDao(cid) {
		try {
			const cart = await cartModel.findById(cid).populate('products._id');
			if (!cart) return `No cart found with ID '${cid}'.`;
			return cart;
		} catch (error) {
			return `${error}`;
		}
	}

	async createCartDao(cart) {
		try {
			const newCart = await cartModel.create(cart);
			if (!newCart) return `No cart was created.`;
			return newCart;
		} catch (error) {
			return `${error}`;
		}
	}

	async createProductDao(cid, pid) {
		try {
			const cart = await cartModel.findById(cid);
			if (!cart) return `No cart found with ID '${cid}'.`;

			const product = await productModel.findById(pid);
			if (!product) return `No product found with ID '${pid}'.`;

			const productInCart = cart.products.find(
				(item) => item._id.toString() === product.id
			);

			if (!productInCart) {
				const create = {
					$push: { products: { _id: product.id, quantity: 1 } },
				};
				await cartModel.findByIdAndUpdate({ _id: cid }, create);
				return await cartModel.findById(cid);
			}

			await cartModel.findByIdAndUpdate(
				{ _id: cid },
				{ $inc: { 'products.$[elem].quantity': 1 } },
				{ arrayFilters: [{ 'elem._id': product.id }] }
			);

			const updatedCart = await cartModel
				.findById(cid)
				.populate('products._id');
			return updatedCart;
		} catch (error) {
			return `${error}`;
		}
	}

	async updateCartDao(cid, newCart) {
		try {
			const cart = await cartModel.findById(cid);
			if (!cart) return `No cart found with ID '${cid}'.`;

			for (const product of newCart) {
				if (product.quantity < 1) {
					logger.warn(
						`'${product.quantity}' is an invalid value for quantity, new value was setted on '1'`
					);
					product.quantity = 1;
				}

				const existProduct = await productModel.findById(product._id);

				if (existProduct && existProduct.stock < product.quantity) {
					product.quantity = existProduct.stock;
					logger.warn(`Insuficient stock, new quantity setted on max stock: '${existProduct.stock}'`)
				}

				if (existProduct && existProduct.stock >= product.quantity) {
					const productInCart = cart.products.find(
						(productInCart) => productInCart.id == existProduct.id
					);

					if (!productInCart) {
						const create = {
							$push: {
								products: { _id: existProduct.id, quantity: product.quantity },
							},
						};
						await cartModel.findByIdAndUpdate({ _id: cid }, create);
					}

					await cartModel.findByIdAndUpdate(
						{ _id: cid },
						{ $set: { 'products.$[elem].quantity': product.quantity } },
						{ arrayFilters: [{ 'elem._id': existProduct.id }] }
					);
				}
			}

			const updatedCart = await cartModel
				.findById(cid)
				.populate('products._id');
			return updatedCart;
		} catch (error) {
			return `${error}`;
		}
	}

	async updateProductDao(cid, pid, newQuantity) {
		try {
			const cart = await cartModel.findById(cid);
			if (!cart) return `No cart found with ID '${cid}'.`;

			const product = await productModel.findById(pid);
			if (!product) return `No product found with ID '${pid}'.`;

			const productInCart = cart.products.find(
				(item) => item._id.toString() === product.id
			);

			if (!productInCart)
				return `No product with ID '${pid}' was found in cart '${cid}'`;

			if (newQuantity > product.stock) {
				newQuantity = product.stock;
				logger.warn(`Insuficient stock, new quantity setted on max stock: '${product.stock}'`)
			}

			await cartModel.findByIdAndUpdate(
				{ _id: cid },
				{ $set: { 'products.$[elem].quantity': newQuantity } },
				{ arrayFilters: [{ 'elem._id': pid }] }
			);

			const updatedCart = await cartModel
				.findById(cid)
				.populate('products._id');
			return updatedCart;
		} catch (error) {
			return `${error}`;
		}
	}

	async deleteCartDao(cid, newCart) {
		try {
			const cartToModify = await cartModel.findById(cid);
			if (!cartToModify) return `No cart found with ID '${cid}'.`;
			await cartModel.findByIdAndUpdate(cid, newCart);

			const updatedCart = await cartModel
				.findById(cid)
				.populate('products._id');
			return updatedCart;
		} catch (error) {
			return `${error}`;
		}
	}

	async deleteProductDao(cid, pid) {
		try {
			const cartToModify = await cartModel.findById(cid);
			if (!cartToModify) return `No cart found with ID '${cid}'.`;

			await cartModel.findByIdAndUpdate(cid, {
				$pull: { products: { _id: pid } },
			});

			const updatedCart = await cartModel
				.findById(cid)
				.populate('products._id');
			return updatedCart;
		} catch (error) {
			return `${error}`;
		}
	}

	async purchaseCartDao(req, res) {
		try {
			const { user } = req.session;
			const { cid } = req.params;
			const cart = await cartModel.findById(cid).populate('products._id');
			if (!cart) return `No cart found with ID '${cid}'.`;
			if (cart.length < 1) return `Cant purchase an empty cart.`;

			let productsToPurchase = [];
			const products = cart.products;
			for (const product of products) {
				const productId = product._id._id;
				const existProduct = await productModel.findById(productId);
				const productStock = existProduct.stock;
				const productQuantity = product.quantity;

				if (existProduct && productStock < productQuantity) {
					logger.warn(`No enough stock for product '${productId}'`)
					continue;
				}

				if (
					existProduct &&
					productStock >= productQuantity &&
					productStock > 0
				) {
					const newStock = productStock - productQuantity;
					await productModel.findByIdAndUpdate(productId, {
						$set: { stock: newStock },
					});

					await cartModel.findByIdAndUpdate(cid, {
						$pull: { products: { _id: productId } },
					});

					const productToPurchase = {
						...existProduct._doc,
						quantity: productQuantity,
					};
					productsToPurchase.push(productToPurchase);
				}
			}

			if (productsToPurchase.length < 1) return `The cart is empty`;

			const actualDate = new Date();
			const formatedDate = JSON.stringify(actualDate).replace(/['"]+/g, '');
			const code = `ticket_${formatedDate}`;
			const amount = getAmount(productsToPurchase);
			const purchaser = new UserDTO(user);
			const ticket = {
				code,
				purchase_datetime: formatedDate,
				purchase_products: productsToPurchase,
				amount,
				purchaser,
			};

			await sendEmail(ticket);
			const createdTicket = await ticketModel.create(ticket);
			if (!createdTicket)
				return `The following products could not be purchased: ${products}`;
			return createdTicket;
		} catch (error) {
			return `${error}`;
		}
	}
}

const MongoDAO = new CartsMongoDAO();
export default MongoDAO;
