import dotenv from 'dotenv';

dotenv.config();

export default {
	MONGO_URL: process.env.MONGO_URL,
	MONGO_SESSION_SECRET: process.env.MONGO_SESSION_SECRET,
	GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
	GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
	PORT: process.env.PORT,
	EMAIL: process.env.EMAIL,
	EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
};
