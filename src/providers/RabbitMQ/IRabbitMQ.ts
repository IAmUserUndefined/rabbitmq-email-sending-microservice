import { Message, Replies } from "amqplib";

interface IRabbitMQ {
    start(): Promise<void>;
    publishInQueue(queue: string, message: string): Promise<boolean>;
    publishInExchange(exchange: string, routingKey: string, message: string): Promise<boolean>;
    consume(queue: string, callback: (message: Message) => void): Promise<Replies.Consume>;
}

export default IRabbitMQ;