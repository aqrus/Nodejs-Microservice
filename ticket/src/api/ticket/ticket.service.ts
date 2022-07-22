import { HttpException, messageException} from "@sgticket-common/common";
import { isEmptyObject } from "@sgticket-common/common";
import TicketDto from "./dtos/ticket.dto";
import ITicket from "./ticket.interface";
import TicketSchema from "./ticket.model";
import { TicketCreatedPublisher, TicketUpdatedPublisher } from '../../events';
import { natsWrapper } from '@sgticket-common/common';
export default class TicketService {
    private TicketSchema = TicketSchema;

    public async createTicket(ticket: TicketDto): Promise<ITicket> {
        if (isEmptyObject(ticket)) {
            throw new HttpException(404, 'TICKET_NOT_FOUND');
        }
        const newTicket = new this.TicketSchema(ticket);
        await newTicket.save();
        await new TicketCreatedPublisher(natsWrapper.client).publish({
            id: newTicket.id,
            title: newTicket.title,
            price: newTicket.price,
            userId: newTicket.userId,
            version: newTicket.version,
        });
        return newTicket;
    }

    public async getAllTickets(): Promise<ITicket[]> {
        return await this.TicketSchema.find();
    }

    public async getTicketById(id: string): Promise<ITicket> {
        const ticket = await this.TicketSchema.findById(id);
        if (!ticket) {
            throw new HttpException(404, 'TICKET_NOT_FOUND');
        }
        return ticket;
    }

    public async updateTicket(id: string, ticket: TicketDto): Promise<ITicket> {
        const ticketToUpdate = await this.TicketSchema.findById(id);
        if (!ticketToUpdate) {
            throw new HttpException(404, 'TICKET_NOT_FOUND');
        }
        ticketToUpdate.set(ticket);
        await ticketToUpdate.save();
        new TicketUpdatedPublisher(natsWrapper.client).publish({
            id: ticketToUpdate.id,
            title: ticketToUpdate.title,
            price: ticketToUpdate.price,
            userId: ticketToUpdate.userId,
            version: ticketToUpdate.version
        });
        return ticketToUpdate;
    }

    public async updateOrderId(id: string, orderId: string): Promise<ITicket> {
        const ticketToUpdate = await this.TicketSchema.findById(id);
        if (!ticketToUpdate) {
            throw new HttpException(404, 'TICKET_NOT_FOUND');
        }
        ticketToUpdate.set({ orderId });
        return await ticketToUpdate.save();
    }

    public async updateOrderCancled(id: string): Promise<ITicket> {
        const ticketToUpdate = await this.TicketSchema.findById(id);
        if (!ticketToUpdate) {
            throw new HttpException(404, 'TICKET_NOT_FOUND');
        }
        ticketToUpdate.set({ orderId: undefined });
        return await ticketToUpdate.save();
    }
}