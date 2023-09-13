import { Server } from 'socket.io';
import { messageModel } from '../dao/mongo/models/messages.model.js';
import { productModel } from '../dao/mongo/models/product.model.js';
import logger from './logger.util.js';

function setupSocket(httpServer) {
	const io = new Server(httpServer);

	io.on('connection', async (socket) => {
		logger.info(`Client ${socket.id} connected`);

		// Buscar productos en DB, escuchar cambios y enviar data:
		const products = await productModel.find().lean();
		io.emit('products', products);

		productModel.watch().on('change', async (change) => {
			const products = await productModel.find().lean();
			io.emit('products', products);
		});

		// Recibir usuarios, mensajes y crear entrada en DB:
		socket.on('user', async (data) => {
			await messageModel.create({
				user: data.user,
				message: data.message,
			});

			const messagesDB = await messageModel.find();
			io.emit('messagesDB', messagesDB);
		});

		socket.on('message', async (data) => {
			await messageModel.create({
				user: data.user,
				message: data.message,
			});

			const messagesDB = await messageModel.find();
			io.emit('messagesDB', messagesDB);
		});

		socket.on('disconnect', () => {
			logger.info(`Client ${socket.id} disconnected`);
		});
	});
}

export default setupSocket;
