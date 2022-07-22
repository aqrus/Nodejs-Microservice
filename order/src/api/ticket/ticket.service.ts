import { HttpException, messageException} from "@sgticket-common/common";
import { isEmptyObject } from "@sgticket-common/common";
import { ITicket } from "./ticket.interface";
import TicketSchema from "./ticket.model";
import { Cloudinary, constant, natsWrapper } from '@sgticket-common/common';
import { TicketCreatedPublisher } from '../../events';
export default class TicketService {
    private TicketSchema = TicketSchema;

    // public async createOrder(order: OrderDto): Promise<ITicket> {
    //     if (isEmptyObject(order)) {
    //         throw new HttpException(404, 'TICKET_NOT_FOUND');
    //     }
    //     const newOrder = new this.OrderSchema(order);
    //     await newOrder.save();
    //     // await new OrderCreatedPublisher(natsWrapper.client).publish({
    //     //     id: newOrder.id,
    //     //     title: newOrder.title,
    //     //     price: newOrder.price,
    //     //     userId: newOrder.userId
    //     // });
    //     return newOrder;
    // }

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
}