import { Publisher, Subjects, ITicketCreatedEvent, ITicketUpdatedEvent } from "@sgticket-common/common";

export class TicketCreatedPublisher extends Publisher<ITicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

export class TicketUpdatedPublisher extends Publisher<ITicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}