/* eslint-disable @typescript-eslint/no-explicit-any */

import RabbitMQ from "./providers/RabbitMQ/RabbitMQ";
import Mail from "./providers/Mail/Mail";
import IPayload from "./interfaces/IPayload";

const rabbit = new RabbitMQ();
const mail = new Mail();        

const bootstrap = async () => {
	await rabbit.start();
	await rabbit.consume("request-send-email", async (message) => { 

		const content: string = message.content.toString();
		const payload: IPayload = JSON.parse(content);
		const { subject, emailBody, email, token, url } = payload;
        
		const response = await mail.sendMail(email, subject, emailBody, {
			appUrl: url,
			email: email,
			token: token
		});

		await rabbit.publishInQueue("response-send-email", response);
	});
};

bootstrap().catch((e) => console.log(e));