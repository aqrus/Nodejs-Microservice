import { Message } from "node-nats-streaming";
import { Listener, Subjects, IOrderCreatedEvent, IOrderCancelledEvent } from "@sgticket-common/common";
import { TicketService } from "../api/ticket";
import { TicketUpdatedPublisher } from './tickets.publisher';

export class OrderCreatedListener extends Listener<IOrderCreatedEvent> {
    subject:Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = "tickets-service";
    TicketService = new TicketService();
    async onMessage(data: IOrderCreatedEvent["data"], msg: Message) {
        const ticket = await this.TicketService.updateOrderId(data.ticket.id, data.id);
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            userId: ticket.userId,
            version: ticket.version,
            orderId: ticket.orderId,
        });
        msg.ack();
    }
}

export class OrderCancelledListener extends Listener<IOrderCancelledEvent> {
    subject:Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = "tickets-service";
    TicketService = new TicketService();
    async onMessage(data: IOrderCancelledEvent["data"], msg: Message) {
        const ticket = await this.TicketService.updateOrderCancled(data.ticket.id);
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            userId: ticket.userId,
            version: ticket.version,
            orderId: ticket.orderId
        });
        msg.ack();
    }
}