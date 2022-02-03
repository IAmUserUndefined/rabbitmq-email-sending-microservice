import IRabbitMQ from "./IRabbitMQ";
import Helper from "../../utils/helper/Helper";
import { Connection, Channel, connect, Message, Replies } from "amqplib";

export default class RabbitMQ implements IRabbitMQ {
    
	private conn: Connection;
	private channel: Channel;

	async start(): Promise<void> {
		this.conn = await connect(Helper.getRabbitURIEnvironmentVariable());
		this.channel = await this.conn.createChannel();
	}

	async publishInQueue(queue: string, message: string): Promise<boolean> {
		return this.channel.sendToQueue(queue, Buffer.from(message));
	}

	async publishInExchange(exchange: string, routingKey: string,message: string): Promise<boolean> {
		return this.channel.publish(exchange, routingKey, Buffer.from(message));
	}

	async consume(queue: string, callback: (message: Message) => void): Promise<Replies.Consume> {
		return this.channel.consume(queue, (message) => {
			callback(message);
			this.channel.ack(message);
		});
	}
}