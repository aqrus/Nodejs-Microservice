import { HttpException, messageException} from "@sgticket-common/common";
import { isEmptyObject } from "@sgticket-common/common";
import TicketDto from "./dtos/ticket.dto";
import ITicket from "./ticket.interface";
import TicketSchema from "./ticket.model";
import fileUpload from "express-fileupload";
import { Cloudinary, constant } from '@sgticket-common/common';
import { TicketCreatedPublisher } from '../../events';
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
            userId: newTicket.userId
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
}