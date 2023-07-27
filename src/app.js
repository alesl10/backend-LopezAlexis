import express from "express";
import __dirname from "./utils.js";

import { messageModel } from "./dao/mongo/models/messages.model.js";
import { productModel } from "./dao/mongo/models/product.model.js";
import session from "express-session";
import MongoStore from "connect-mongo";


// Rutas
import productsRoute from "./routes/products.router.js";
import cartsRoute from "./routes/carts.router.js";
import viewsRoute from "./routes/views.router.js";
import messagesRoute from "./routes/messages.router.js";
import cookiesRoute from "./routes/cookies.router.js";
import sessionsRoute from "./routes/sessions.router.js";

// Socket & Server:
const app = express();
import { Server } from "socket.io";
const httpServer = app.listen(8080, () => console.log('servidor arriba'));
const io = new Server(httpServer);

import mongoose from "mongoose";
const mongoUrl = "mongodb+srv://lopezalexis499:Giorello93@ecommerce.pdilq1a.mongodb.net/?retryWrites=true&w=majority"
const enviroment = async () => { await mongoose.connect(mongoUrl) };
enviroment();
app.use(session({
	store: MongoStore.create({ mongoUrl }),
	secret: "<SECRET>",
	resave: false,
	saveUninitialized: true,
}));

// Passport
import passport from "passport";
import initializePassport from "./config/passport.config.js";
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
import handlebars from "express-handlebars";
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);
app.use("/api/cookies", cookiesRoute);
app.use("/api/sessions", sessionsRoute);
app.use("/api/messages", messagesRoute);
app.use("/", viewsRoute);


io.on("connection", async socket => {
	console.log(`cliente conectado`);

	// Buscar productos, escuchar cambios y enviar data
	const products = await productModel.find().lean();
	io.emit("products", products);

	productModel.watch().on("change", async change => {
		const products = await productModel.find().lean();
		io.emit("products", products);
	});


// Recibir usuarios, mensajes y crear entrada en DB:
socket.on("user", async data => {
	await messageModel.create({
		user: data.user,
		message: data.message,
	});

	const messagesDB = await messageModel.find();
	io.emit("messagesDB", messagesDB);
});

socket.on("message", async data => {
	await messageModel.create({
		user: data.user,
		message: data.message,
	});

	const messagesDB = await messageModel.find();
	io.emit("messagesDB", messagesDB);
});


});