import { HttpException, messageException} from "@sgticket-common/common";
import { isEmptyObject } from "@sgticket-common/common";
import { ITicket } from "./ticket.interface";
import TicketSchema from "./ticket.model";
export default class TicketService {
    private TicketSchema = TicketSchema;

    public async createTicket(id: string, title: string, price: number): Promise<ITicket> {
        const newTicket = new this.TicketSchema({
            _id: id,
            title: title,
            price: price
        });
        return await newTicket.save();
    }

    // public async getAllOrders(): Promise<ITicket[]> {
    //     return await this.OrderSchema.find();
    // }

    public async getTicketById(id: string): Promise<ITicket> {
        const ticket = await this.TicketSchema.findById(id);
        if (!ticket) {
            throw new HttpException(404, 'Order_NOT_FOUND');
        }
        return ticket;
    }

    public async updateTickets(id: string, title: string, price: number, version: number): Promise<void> {
        const ticket = await this.TicketSchema.findOne({
            _id: id,
            version: version - 1
        });
        if (!ticket) {
            throw new HttpException(404, 'Order_NOT_FOUND');
        }
        await this.TicketSchema.findByIdAndUpdate(id, { title: title, price: price });
    }
}