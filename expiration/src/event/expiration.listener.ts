import { IOrderCreatedEvent, Listener, Subjects } from "@sgticket-common/common";
import { Message } from "node-nats-streaming";
import expirationQueue from "../queues/expiration-queue";

export default class OrderCreatedListener extends Listener<IOrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = 'expiration-service';
    async onMessage(data: IOrderCreatedEvent['data'], msg: Message) {
        const expiration = new Date(data.expiresAt).getTime() - new Date().getTime();
        await expirationQueue.add({ orderId: data.id }, {
            delay: expiration,
        });

        msg.ack();
    }
}