import { cartModel } from '../dao/mongo/models/cart.model.js';

export default async function userCart(req, res) {
	let { cart } = req.signedCookies;
	if (!cart) {
		const createCart = await cartModel.create({ products: [] });
		const cartId = createCart.id;
		res.cookie('cart', cartId, { signed: true });
		cart = cartId;
	}
	return cart;
}
