import { Message } from "node-nats-streaming";
import { Listener, Subjects } from "@sgticket-common/common";
import { ITicketCreatedEvent } from './order.interface';
export class TicketCreatedListener extends Listener<ITicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'payments-service';
    onMessage(data: ITicketCreatedEvent['data'], msg: Message) {
        console.log('Event received');

        //if we dont force ITicketCreatedEvent we can use this as below
        console.log(data.id);
        console.log(data.title);
        console.log(data.price);
        msg.ack();
    }
}