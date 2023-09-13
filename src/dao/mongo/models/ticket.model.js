import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  code: {
		type: String,
		unique: true,
	},
  purchase_datetime: String,
  purchase_products: Array,
  amount: Number,
  purchaser: Object,
});

export const ticketModel = mongoose.model('Tickets', ticketSchema);
