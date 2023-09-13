class ViewsRepository {
	constructor(dao) {
		this.dao = dao;
	}

	async getHome(req, res) {
		try {
			return await this.dao.getHomeDao(req, res);
		} catch (error) {
			return `${error}`;
		}
	}

	async getLogin() {
		try {
			return await this.dao.getLoginDao();
		} catch (error) {
			return `${error}`;
		}
	}

	async getRegister() {
		try {
			return await this.dao.getRegisterDao();
		} catch (error) {
			return `${error}`;
		}
	}

	async getChat(req, res) {
		try {
			return await this.dao.getChatDao(req, res);
		} catch (error) {
			return `${error}`;
		}
	}

	async getProducts(req, res) {
		try {
			return await this.dao.getProductsDao(req, res);
		} catch (error) {
			return `${error}`;
		}
	}

	async getProduct(req, res) {
		try {
			return await this.dao.getProductDao(req, res);
		} catch (error) {
			return `${error}`;
		}
	}

	async getCart(req, res) {
		try {
			return await this.dao.getCartDao(req, res);
		} catch (error) {
			return `${error}`;
		}
	}
}

export default ViewsRepository;
