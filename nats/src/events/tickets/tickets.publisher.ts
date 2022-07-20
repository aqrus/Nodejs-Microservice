import Publisher from "../base.publisher";
import { Subjects } from "../../ultils";
import { ITicketCreatedEvent } from "./tickets.interface";

export class TicketCreatedPublisher extends Publisher<ITicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;

}