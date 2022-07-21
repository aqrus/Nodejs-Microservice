import { Publisher, Subjects } from "@sgticket-common/common";
import { ITicketCreatedEvent } from "./tickets.interface";

export class TicketCreatedPublisher extends Publisher<ITicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}