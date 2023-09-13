import { viewsRepository } from '../repositories/repository.js';

export const home = async (req, res) => {
	try {
		const { user } = req.session;
		if (!user) return res.redirect('/login');
		const payload = await viewsRepository.getHome(req, res);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).render('home', payload);
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const login = async (req, res) => {
	try {
		const { user } = req.session;
		if (user) return res.redirect('/');
		const payload = await viewsRepository.getLogin();
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).render('login', payload);
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const register = async (req, res) => {
	try {
		const { user } = req.session;
		if (user) return res.redirect('/');
		const payload = await viewsRepository.getRegister();
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).render('register', payload);
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const chat = async (req, res) => {
	try {
		const { user } = req.session;
		if (!user) return res.redirect('/login');
		const payload = await viewsRepository.getChat(req, res);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).render('chat', payload);
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const products = async (req, res) => {
	try {
		const { user } = req.session;
		if (!user) return res.redirect('/');
		const payload = await viewsRepository.getProducts(req, res);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).render('products', payload);
	} catch (err) {
		return res.status(500).json({status: 'error', message: err.message});
	}
};

export const product = async (req, res) => {
	try {
		const { user } = req.session;
		if (!user) return res.redirect('/');
		const payload = await viewsRepository.getProduct(req, res);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).render('product', payload);
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const cart = async (req, res) => {
	try {
		const { user } = req.session;
		if (!user) return res.redirect('/');
		const payload = await viewsRepository.getCart(req, res);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.status(200).render('cart', payload);
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};
