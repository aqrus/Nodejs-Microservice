import { Message } from "node-nats-streaming";
import { Listener, Subjects, ITicketCreatedEvent, ITicketUpdatedEvent } from "@sgticket-common/common";
import { TicketService } from "../api/ticket";
export class TicketCreatedListener extends Listener<ITicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'orders-service';
    TicketService = new TicketService();
    async onMessage(data: ITicketCreatedEvent['data'], msg: Message) {
        const { id, title, price } = data;
        await this.TicketService.createTicket(id, title, price);
        msg.ack();
    }
}

export class TicketUpdatedListener extends Listener<ITicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = 'orders-service';
    TicketService = new TicketService();
    async onMessage(data: ITicketUpdatedEvent['data'], msg: Message) {
        const { id, title, price, version } = data;
        await this.TicketService.updateTickets(id, title, price, version);
        msg.ack();
    }
}