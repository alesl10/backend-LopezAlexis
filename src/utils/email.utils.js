import { createTransport } from 'nodemailer';
import config from '../config/environment.config.js';

const EMAIL = config.EMAIL;
const EMAIL_PASSWORD = config.EMAIL_PASSWORD;

const transporter = createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: EMAIL,
		pass: EMAIL_PASSWORD,
	},
});

const sendEmail = async (ticket) => {
	try {
		const userEmail = ticket.purchaser.email;
		const orderCode = ticket.code;
		const orderAmount = ticket.amount;

		const emailContent = {
			from: EMAIL,
			to: `${userEmail}`,
			subject: 'Thanks for your order',
			html: `
			<div>
				<p>Your order was processed</p>
				<p>Order code: ${orderCode}</p>
				<p>Total: $${orderAmount}</p>
			</div>
			`
		};

		await transporter.sendMail(emailContent);
	} catch (error) {
		return `${error}`
	}
}

export default sendEmail;
