import { Subjects } from "@sgticket-common/common";

export interface ITicketCreatedEvent {
    subject: Subjects.TicketCreated;
    data: {
        id: string;
        title: string;
        price: number;
        userId: string;
    };
}