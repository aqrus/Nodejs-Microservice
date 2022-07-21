import { Message } from "node-nats-streaming";
import Listener from "../../../../common/src/nats/base.listener";
import { Subjects } from "../../ultils";
import { ITicketCreatedEvent } from './tickets.interface';
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