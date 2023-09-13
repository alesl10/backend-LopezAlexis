class CartsRepository {
	constructor(dao) {
		this.dao = dao;
	}

	async getCarts() {
		try {
			return await this.dao.getCartsDao();
		} catch (error) {
			return `${error}`;
		}
	}

	async getCart(cid) {
		try {
			return await this.dao.getCartDao(cid);
		} catch (error) {
			return `${error}`;
		}
	}

	async createCart() {
		try {
			const cart = {
				products: [],
			};
			return await this.dao.createCartDao(cart);
		} catch (error) {
			return `${error}`;
		}
	}

	async createProduct(cid, pid) {
		try {
			return await this.dao.createProductDao(cid, pid);
		} catch (error) {
			return `${error}`;
		}
	}

	async updateCart(cid, newCart) {
    try {
      return await this.dao.updateCartDao(cid, newCart);
    } catch (erroror) {
      return erroror;
    }
  }

	async updateProduct(cid, pid, quantity) {
		try {
			if (quantity < 1 || typeof(quantity) != 'number') return `'${quantity}' is an invalid value for quantity.`
			return await this.dao.updateProductDao(cid, pid, quantity);
		} catch (error) {
			return `${error}`;
		}
	}

	async deleteCart(cid) {
		try {
			const cart = {
				products: [],
			};
			return await this.dao.deleteCartDao(cid, cart);
		} catch (error) {
			return `${error}`;
		}
	}

	async deleteProduct(cid, pid) {
		try {
			return await this.dao.deleteProductDao(cid, pid);
		} catch (error) {
			return `${error}`;
		}
	}

	async purchaseCart(req, res) {
		try {
			return await this.dao.purchaseCartDao(req, res);
		} catch (error) {
			return `${error}`;
		}
	}
}

export default CartsRepository;
