import { HttpException, messageException} from "@sgticket-common/common";
import { isEmptyObject } from "@sgticket-common/common";
import OrderDto from "./dtos/order.dto";
import IOrder from "./order.interface";
import OrderSchema from "./order.model";
import { natsWrapper, OrderStatus} from '@sgticket-common/common';
import { OrderCanncelledPublisher, OrderCreatedPublisher } from '../../events';
import { TicketService } from "../ticket";
export default class OrderService {
    private OrderSchema = OrderSchema;
    private TicketService = new TicketService();
    private EXPIRATION_WINDOW_SECONDS = 15 * 60;
    public async createOrder( userId: string, orderModel: OrderDto): Promise<IOrder> {
        if (isEmptyObject(orderModel)) {
            throw new HttpException(404, 'TICKET_NOT_FOUND');
        }
        // Find ticket the user is trying to order in the database
        const ticket = await this.TicketService.getTicketById(orderModel.ticketId);
        // Make sure that the ticket is not reserved
        // Run query to look at all orders. Find an order where the ticket
        // is the ticket the user is trying to order and the order status is
        // not cancelled. If we find an order from that means the ticket is reserved
        const isReserved = await ticket.isReverved();
        if (isReserved) {
            throw new HttpException(400, 'TICKET_NOT_AVAILABLE');
        }

        //Calculate an expiration date for the order
        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + this.EXPIRATION_WINDOW_SECONDS);
        const newOrder = new this.OrderSchema({
            userId: userId,
            status: OrderStatus.Created,
            expiresAt: expiration,
            ticketId: ticket.id
        });
        await newOrder.save();

        // Publish an event saying that an order was created
        new OrderCreatedPublisher(natsWrapper.client).publish({
            id: newOrder.id,
            status: newOrder.status,
            userId: newOrder.userId,
            expiresAt: newOrder.expiresAt.toISOString(),
            ticket: {
                id: ticket.id,
                price: ticket.price
            }
        });
        return newOrder;
    }

    public async getAllOrders(userId: string): Promise<IOrder[]> {
        return await this.OrderSchema.find({ userId: userId }).populate('ticket');
    }

    public async getOrderById(id: string): Promise<IOrder> {
        const order = await this.OrderSchema.findById(id);
        if (!order) {
            throw new HttpException(404, 'Order_NOT_FOUND');
        }
        return order;
    }

    public async cancelOrder(orderId: string, userId: string): Promise<IOrder> {
        const order = await this.getOrderById(orderId);
        if (order.userId !== userId) {
            throw new HttpException(401, 'UNAUTHORIZED');
        }
        order.status = OrderStatus.Cancelled;
        const newOrder = new this.OrderSchema(order);
        await newOrder.save();
        new OrderCanncelledPublisher(natsWrapper.client).publish({
            id: order.id,
            status: order.status,
            ticket: {
                id: order.ticket
            }
        });
        return newOrder;
    }
}