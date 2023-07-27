import { Router } from "express";
import cookieParser from "cookie-parser";

const router = Router();
router.use(cookieParser("<COOKIESECRET>"));

// crear cookie
router.get("/set", (req, res) => {
	try {
		res.cookie("New cookie", "es una cookie", {
			maxAge: 5000,
			signed: true,
		});
		return res.status(200).send(`Cookie`);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

// obtener cookie
router.get("/get", (req, res) => {
	try {
		return res.status(200).send(req.signedCookies);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

// borrar cookie:
router.get("/delete", (req, res) => {
	try {
		res.clearCookie("New cookie");
		return res.status(200).send(`Cookie eliminada`);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

export default router;