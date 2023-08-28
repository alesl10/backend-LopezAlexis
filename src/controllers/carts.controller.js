import { cartModel } from "../dao/mongo/models/cart.model.js";
import { productModel } from "../dao/mongo/models/product.model.js";

// obtener todos los carritos
export const carts = async (req, res) => {
	try {
		let result = await cartModel.find();
		return res.status(200).json({ status: "success", payload: result });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
};

// obtener carrito por id
export const cart = async (req, res) => {
	try {
		const { id } = req.params;
		let result = await cartModel.findById(id).populate('products._id');

		if (!result) {
			return res.status(200).send(`There's no cart with ID ${id}`);
		};

		return res.status(200).json({ status: "success", payload: result });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
};

// crear carrito
export const createCart = async (req, res) => {
	try {
		const result = await cartModel.create({
			products: [],
		});

		return res.status(200).json({ status: "success", payload: result });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
};

// agregar segun id
export const addProduct = async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const newProduct = await productModel.findById(pid);
		const cart = await cartModel.findById(cid);

		// Validar si el producto existe en el carrito:
		const productInCart = cart.products.find(product => product._id.toString() === newProduct.id);

		// Si no existe, crearlo:
		if (!productInCart) {
			const create = {
				$push: { products: { _id: newProduct.id, quantity: 1 } },
			};
			await cartModel.findByIdAndUpdate({ _id: cid }, create);

			const result = await cartModel.findById(cid);
			return res.status(200).json({ status: "success", payload: result });
		};

		// Si existe, aumentar la cantidad en una unidad:
		await cartModel.findByIdAndUpdate(
			{ _id: cid },
			{ $inc: { "products.$[elem].quantity": 1 } },
			{ arrayFilters: [{ "elem._id": newProduct.id }] }
		);

		const result = await cartModel.findById(cid);
		return res.status(200).json({ status: "success", payload: result });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
};

// actualizar
export const updateCart = async (req, res) => {
	try {
		const { cid } = req.params;
		let newCart = req.body;
		const cart = await cartModel.findById(cid);

		// Iterar por cada producto
		newCart.forEach( async product => {
			// Validar si la cantidad es correcta, sino corregirla a 1:
			if (product.quantity < 1) {
				console.log(`error`);
				product.quantity = 1
			};

			// Validar si el producto existe y el stock es suficiente:
			const existProduct = await productModel.findById(product._id);
			if(existProduct && existProduct.stock > product.quantity) {
				// Validar si el producto existe en el carrito:
				const productInCart = cart.products.find(productInCart => productInCart.id === existProduct.id);

				// Si no existe, crearlo:
				if (!productInCart) {
					const create = {
						$push: { products: { _id: existProduct.id, quantity: product.quantity } },
					};
					await cartModel.findByIdAndUpdate({ _id: cid }, create);
				};

				// Si existe, actualizar la cantidad:
				await cartModel.findByIdAndUpdate(
					{ _id: cid },
					{ $set: { "products.$[elem].quantity": product.quantity } },
					{ arrayFilters: [{ "elem._id": existProduct.id }] }
				);
			};
		});

		const result = await cartModel.findById(cid);
		return res.status(200).json({ status: "success", payload: result });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
};

// actualizar producto
export const updateProduct = async (req, res) => {
	try {
		const { cid, pid } = req.params;
		let newQuantity = req.body.quantity;
		const product = await productModel.findById(pid);

		// Validar stock 
		if(newQuantity > product.stock) {
			console.log(`no hay suficiente stock`);
			newQuantity = product.stock;
		}
		// actualizar cantidad
		await cartModel.findByIdAndUpdate(
			{ _id: cid },
			{ $set: { "products.$[elem].quantity": newQuantity } },
			{ arrayFilters: [{ "elem._id": pid }] }
		);

		const result = await cartModel.findById(cid);
		return res.status(200).json({ status: "success", payload: result });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
};

// borrar todos los productos
export const deleteCart = async (req, res) => {
	try {
		const { id } = req.params;
		await cartModel.findByIdAndUpdate(id, {products: []});

		const result = await cartModel.find();
		return res.status(200).json({ status: "success", payload: result });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
};

// borrar producto de carrito
export const deleteProduct = async (req, res) => {
	try {
		const { cid, pid } = req.params;
		await cartModel.findByIdAndUpdate(cid, {
			$pull: { products: { _id: pid } }
		})

		const result = await cartModel.find();
		return res.status(200).json({ status: "success", payload: result });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
};