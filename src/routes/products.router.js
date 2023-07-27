import { Router } from "express";
import { productModel } from "../dao/mongo/models/product.model.js";

const router = Router();

// todos losproductos
router.get("/", async (req, res) => {
	try {
		const result = await productModel.find();
		return res.status(200).json({ status: "success", payload: result });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

// producto por id
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const result = await productModel.findById(id);

		if (!result) {
			return res.status(200).send(`No se encontro el producto ${id}`);
		};

		return res.status(200).json({ status: "success", payload: result });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

// agregar producto
router.post("/", async (req, res) => {
	try {
		const { title, description, code, price, stock, category } = req.body;

		if (
			!title ||
			!description ||
			!code ||
			!price ||
			!stock ||
			!category ||
			!price
		) {
			return res.status(200).send(`todos los campos son obligatorios`);
		};

		const result = await productModel.create({
			title,
			description,
			code: code.replace(/\s/g, "").toLowerCase(),
			price,
			stock,
			category: category.toLowerCase(),
		});

		return res.status(200).json({ status: "success", payload: result });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

// actualizar producto
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { title, description, code, price, stock, category } = req.body;
		const product = await productModel.findById(id);

		if (!product) {
			return res.status(200).send(`no se encontro el producto ${id}`);
		};

		if (
			!title ||
			!description ||
			!code ||
			!price ||
			!stock ||
			!category ||
			!price
		) {
			return res.status(200).send(`complete todos los campos para seguir`);
		};
		
		const newproduct = {
			title,
			description,
			code: code.replace(/\s/g, "").toLowerCase(),
			price,
			stock,
			category: category.toLowerCase(),
		};
		await productModel.updateOne({ _id: id }, newproduct);

		const result = await productModel.findById(id);
		return res.status(200).json({ status: "success", payload: result });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

// borrar producto
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await productModel.deleteOne({ _id: id });

		const result = await productModel.find();
		return res.status(200).json({ status: "success", payload: result });
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

export default router;
