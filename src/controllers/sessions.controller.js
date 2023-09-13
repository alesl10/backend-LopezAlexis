import { sessionsRepository } from '../repositories/repository.js';

export const login = async (req, res) => {
	try {
		const payload = await sessionsRepository.getLogin(req, res);
		if (typeof(payload) == 'string') return res.status(404).send(payload);
		return res.status(200).json({ status: 'success', user: payload });
	} catch (err) {
		return res.status(500).json({ status: 'success', error: err.message });
	}
};

export const register = async (req, res) => {
	try {
		const payload = await sessionsRepository.getRegister(req, res);
		if (typeof(payload) == 'string') return res.status(404).send(payload);
		return res.status(200).json({ status: 'success', user: payload });
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const current = async (req, res) => {
	try {
		const { user } = req.session;
		if (!user) return res.redirect('/');
		const payload = await sessionsRepository.getCurrent(req, res);
		if (typeof(payload) == 'string') return res.status(404).send(payload);
		return res.status(200).json({ status: 'success', user: payload });
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};


export const github = async (req, res) => {
	try {
		const payload = await sessionsRepository.getGithub(req, res);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.redirect('/');
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const githubCallback = async (req, res) => {
	try {
		const payload = await sessionsRepository.getGithubCallback(req, res);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.redirect('/');
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};

export const logout = async (req, res) => {
	try {
		const payload = await sessionsRepository.getLogout(req, res);
		if (typeof(payload) == 'string') return res.status(404).json({ status: 'error', message: payload });
		return res.redirect('/');
	} catch (err) {
		return res.status(500).json({ status: 'error', error: err.message });
	}
};