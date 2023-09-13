import { hashPassword, isValidPassword } from "../../utils/hash.utils.js"

class SessionsMemoryDAO {
	constructor() {
		this.users = [];
		this.admins = [{
			email: "adminCoder@coder.com",
			password: hashPassword("adminCod3r123")
		}];
	}

	getLoginDao(req, res) {
		try {
			const users = this.users;
			const admins = this.admins;
			const { email, password } = req.body;

			if (email == 'adminCoder@coder.com') {
				const admin = admins.find(admin => admin.email == email);
				if (!admin || !isValidPassword(admin, password)) return `Invalid credentials.`
				req.session.user = admin;
				return admin;
			};

			const user = users.find(user => user.email == email);
			if (!user || !isValidPassword(user, password)) return `Invalid credentials.`;
			req.session.user = user;
			return user;
		} catch (error) {
			return `${error}`;
		}
	}

	getRegisterDao(req, res) {
		try {
			const users = this.users;
			const { email, password, first_name, last_name } = req.body;

			if (email == 'adminCoder@coder.com') return `You can't create an admin account.`;

			const user = users.find(user => user.email == email);
			if (user) return `Email already exist.`;

			const newUser = {
				first_name,
				last_name,
				email,
				password: hashPassword(password)
			};
			users.push(newUser);
			req.session.user = newUser;
			return newUser;
		} catch (error) {
			return `${error}`;
		}
	}
	
	getGithubDao() {
		try {
			return `Github login is not available in local.`
		} catch (error) {
			return `${error}`;
		}
	}

	getGithubCallbackDao() {
		try {
			return `Github login is not available in local.`
		} catch (error) {
			return `${error}`;
		}
	}

	getLogoutDao(req, res) {
		try {
			return req.session.destroy();
		} catch (error) {
			return `${error}`;
		}
	}
}

const MemoryDAO = new SessionsMemoryDAO();
export default MemoryDAO;
