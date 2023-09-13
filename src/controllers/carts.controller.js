import { cartsRepository } from '../repositories/repository.js';

export const carts = async (req, res) => {
	try {
		const payload = await cartsRepository.getCarts();
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).json({ status: 'success', carts: payload });
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const cart = async (req, res) => {
	try {
		const { cid } = req.params;
		const payload = await cartsRepository.getCart(cid);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).json({ status: 'success', cart: payload });
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const insertCart = async (req, res) => {
	try {
		const payload = await cartsRepository.createCart();
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).json({ status: 'success', cart: payload });
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const insertProduct = async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const payload = await cartsRepository.createProduct(cid, pid);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).json({ status: 'success', cart: payload });
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const editCart = async (req, res) => {
	try {
		const { cid } = req.params;
		const newCart = req.body;
		const payload = await cartsRepository.updateCart(cid, newCart);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).json({ status: 'success', cart: payload });
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const editProduct = async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const { quantity } = req.body;
		const payload = await cartsRepository.updateProduct(cid, pid, quantity);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).json({ status: 'success', cart: payload });
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const clearCart = async (req, res) => {
	try {
		const { cid } = req.params;
		const payload = await cartsRepository.deleteCart(cid);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).json({ status: 'success', cart: payload });
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const clearProduct = async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const payload = await cartsRepository.deleteProduct(cid, pid);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).json({ status: 'success', cart: payload });
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const purchase = async (req, res) => {
	try {
		const payload = await cartsRepository.purchaseCart(req, res);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).json({ status: 'success', cart: payload });
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};