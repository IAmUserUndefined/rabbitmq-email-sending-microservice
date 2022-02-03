/* eslint-disable @typescript-eslint/no-explicit-any */

import RabbitMQ from "./providers/RabbitMQ/RabbitMQ";
import SendMail from "./classes/SendMail/SendMail";
import IPayload from "./interfaces/IPayload";

const bootstrap = async () => {

	const rabbit = new RabbitMQ();
	await rabbit.start();
	await rabbit.consume("request-send-email", async (message) => { 

		const content: string = message.content.toString();
		const payload: IPayload = JSON.parse(content);
		const { subject, emailBody, email, token, url } = payload;
        
		const sendEmail = new SendMail();        
		const response = await sendEmail.execute({ subject, emailBody, email, token, url });

		await rabbit.publishInQueue("response-send-email", response);
	});
};

bootstrap().catch((e) => console.log(e));