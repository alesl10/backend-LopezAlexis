import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: String,
	role: {
		type: String,
		default: 'user',
	},
});

export const userModel = mongoose.model('Users', userSchema);
