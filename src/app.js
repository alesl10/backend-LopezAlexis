import express from "express";
import __dirname from "./utils.js";
import router from './routes/router.js';
import morgan from 'morgan';
import config from './config/enviroment.config.js';

import { messageModel } from "./dao/mongo/models/messages.model.js";
import { productModel } from "./dao/mongo/models/product.model.js";
import session from "express-session";
import MongoStore from "connect-mongo";


// Socket & Server:
const PORT = config.PORT;
const app = express();
import { Server } from "socket.io";
const httpServer = app.listen(PORT, () => console.log('servidor arriba'));
const io = new Server(httpServer);

import mongoose from "mongoose";
const mongoUrl = config.MONGO_URL

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
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



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

router(app);