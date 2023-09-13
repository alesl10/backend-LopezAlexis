import { faker } from '@faker-js/faker/locale/es';

class ProductsMemoryDAO {
	constructor() {
		this.data = [];
	}

	getProductsDao() {
		try {
			const products = this.data;
			if(!products) return `No products found.`
			return products;
		} catch (error) {
			return `${error}`;
		}
	}

	getProductDao(pid) {
		try {
			const products = this.data;
			const product = products.find(product => product._id == pid);
			if(!product) return `No product found with ID '${pid}'.`
			return product;
		} catch (error) {
			return `${error}`;
		}
	}

	createProductDao(product) {
		try {
			const products = this.data;
			const newId = faker.database.mongodbObjectId();
			const existCode = products.some(item => item.code == product.code);
			if (existCode) return `Code '${product.code}' already exist.`;

			const newProduct = {
				_id: newId,
				...product,
			};
			products.push(newProduct);

			if(!newProduct) return `No product was created.`
			return newProduct
		} catch (error) {
			return `${error}`;
		}
	}

	updateProductDao(pid, product) {
		try {
			const products = this.data;
			const productToModify = products.find(item => item._id == pid);
			const productIndex = products.findIndex(item => item._id == pid);
			if(!productToModify) return `No product found with ID '${pid}'.`

			const newProduct = {
				_id: productToModify._id,
				...product,
			};
			products[productIndex] = newProduct;

			return products[productIndex];
		} catch (error) {
			return `${error}`;
		}
	}

	deleteProductDao(pid) {
		try {
			const products = this.data;
			const product = products.find(item => item._id == pid);
			const productIndex = products.findIndex(item => item._id == pid);
			if(!product) return `No product found with ID '${pid}'.`
			products.splice(productIndex, 1);
			return products;
		} catch (error) {
			return `${error}`;
		}
	}

	async generateProductsDao() {
		try {

			return products;
		} catch (error) {
			return `${error}`;
		}
	}
}

const MemoryDAO = new ProductsMemoryDAO();
export default MemoryDAO;
