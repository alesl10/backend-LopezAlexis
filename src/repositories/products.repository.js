import ProductDTO from '../dto/product.dto.js';

class ProductsRepository {
	constructor(dao) {
		this.dao = dao;
	}

	async getProducts() {
		try {
			return await this.dao.getProductsDao();
		} catch (error) {
			return `${error}`;
		}
	}

	async getProduct(pid) {
		try {
			return await this.dao.getProductDao(pid);
		} catch (error) {
			return `${error}`;
		}
	}

	async createProduct(newProduct) {
		try {
			const { title, description, code, price, stock, category } = newProduct;
			if (
				!title ||
				!description ||
				!code ||
				!price ||
				!stock ||
				!category ||
				!price
			) return `Please complete all the fields to update the product.`;
			const product = new ProductDTO(newProduct);
			return await this.dao.createProductDao(product);
		} catch (error) {
			return `${error}`;
		}
	}

	async updateProduct(pid, newProduct) {
		try {
			const { title, description, code, price, stock, category } = newProduct;
			if (
				!title ||
				!description ||
				!code ||
				!price ||
				!stock ||
				!category ||
				!price
			) return `Please complete all the fields to update the product.`;
			const product = new ProductDTO(newProduct);
			return await this.dao.updateProductDao(pid, product);
		} catch (error) {
			return `${error}`;
		}
	}

	async deleteProduct(pid) {
		try {
			return await this.dao.deleteProductDao(pid);
		} catch (error) {
			return `${error}`;
		}
	}

	async generateProducts() {
		try {
			return await this.dao.generateProductsDao();
		} catch (error) {
			return `${error}`;
		}
	}
}

export default ProductsRepository;
