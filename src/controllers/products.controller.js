import { productsRepository } from '../repositories/repository.js';

export const products = async (req, res) => {
	try {
		const payload = await productsRepository.getProducts();
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).json({ status: 'success', products: payload });
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const product = async (req, res) => {
	try {
		const { pid } = req.params;
		const payload = await productsRepository.getProduct(pid);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).json({ status: 'success', product: payload });
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const insertProduct = async (req, res) => {
	try {
		const newProduct = req.body;
		const payload = await productsRepository.createProduct(newProduct);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).json({ status: 'success', product: payload });
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const editProduct = async (req, res) => {
	try {
		const { pid } = req.params;
		const newProduct = req.body;
		const payload = await productsRepository.updateProduct(pid, newProduct);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).json({ status: 'success', product: payload });
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const eraseProduct = async (req, res) => {
	try {
		const { pid } = req.params;
		const payload = await productsRepository.deleteProduct(pid);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).json({ status: 'success', products: payload });
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const mockingProducts = async (req, res) => {
	try {
		const payload = await productsRepository.generateProducts(req, res);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).json({ status: 'success', products: payload });
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};