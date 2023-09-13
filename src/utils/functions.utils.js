import { cartModel } from '../dao/mongo/models/cart.model.js';
import cartsDao from "../dao/memory/carts.memory.js";

export function validatePage(page) {
	if (page == undefined || page == '' || page < 1 || isNaN(page)) page = 1;
	return page;
}

export function validateLimit(limit) {
	if (limit == undefined || limit == '' || limit < 1 || isNaN(limit))
		limit = 10;
	return limit;
}

export function validateSort(sort) {
	if (sort == undefined || (sort !== 'asc' && sort !== 'desc') || !isNaN(sort))
		sort = 'asc';
	return sort;
}

export function validateQuery(query) {
	if (query == undefined || !isNaN(query)) {
		query = {};
		return query;
	}
	query = { category: query };
	return query;
}

export function multiply(a, b) {
	let total = a * b;
	return total;
}

export function getTotal(items) {
	let total = 0;
	for (const item of items) {
		total += item._id.price * item.quantity;
	}
	return total;
}

export function getAmount(items) {
	let total = 0;
	for (const item of items) {
		total += item.price * item.quantity;
	}
	return total;
}

export async function mongoCart(req, res) {
	let { cart } = req.signedCookies;
	const existCart = await cartModel.findById(cart);

	if (existCart) {
		return cart
	} else if (cart && !existCart) {
		const createdCart = await cartModel.create({ products: [] });
		const cartId = createdCart.id;
		res.cookie('cart', cartId, { signed: true });
		cart = cartId;
	}
}

export function memoryCart(req, res) {
	const obj = {
		products: [],
	};

	let { cart } = req.signedCookies;
	const carts = cartsDao.getCartsDao();
	const existCart = carts.find(item => item._id == cart);

	if (existCart) {
		return cart
	} else if (cart && !existCart) {
		const newCart = {
			_id: cart,
			...obj,
		};
		carts.push(newCart);
	} else {
		const newCart = cartsDao.createCartDao(obj);
		res.cookie('cart', newCart._id, { signed: true });
		cart = newCart._id;
	}
	return cart;
}