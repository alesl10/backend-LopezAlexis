import passportCall from '../../utils/passport.utils.js';

class SessionsMongoDAO {
	constructor() {}

	async getLoginDao(req, res) {
		try {
			return await passportCall(req, res, 'login')
		} catch (error) {
			return `${error}`;
		}
	}

	async getRegisterDao(req, res) {
		try {
			return await passportCall(req, res, 'register')
		} catch (error) {
			return `${error}`;
		}
	}

	async getGithubDao(req, res) {
		try {
			return await passportCall(req, res, 'github')
		} catch (error) {
			return `${error}`;
		}
	}

	async getGithubCallbackDao(req, res) {
		try {
			return await passportCall(req, res, 'github')
		} catch (error) {
			return `${error}`;
		}
	}

	async getLogoutDao(req, res) {
		try {
			return req.session.destroy();
		} catch (error) {
			return `${error}`;
		}
	}
}

const MongoDAO = new SessionsMongoDAO();
export default MongoDAO;