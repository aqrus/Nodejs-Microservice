import { HttpException, messageException} from "@sgticket-common/common";
import { isEmptyObject } from "@sgticket-common/common";
import OrderDto from "./dtos/order.dto";
import IOrder from "./order.interface";
import OrderSchema from "./order.model";
import fileUpload from "express-fileupload";
import { Cloudinary, constant, natsWrapper } from '@sgticket-common/common';
import { TicketCreatedPublisher } from '../../events';
export default class OrderService {
    private OrderSchema = OrderSchema;

    public async createOrder(order: OrderDto): Promise<IOrder> {
        if (isEmptyObject(order)) {
            throw new HttpException(404, 'TICKET_NOT_FOUND');
        }
        const newOrder = new this.OrderSchema(order);
        await newOrder.save();
        // await new OrderCreatedPublisher(natsWrapper.client).publish({
        //     id: newOrder.id,
        //     title: newOrder.title,
        //     price: newOrder.price,
        //     userId: newOrder.userId
        // });
        return newOrder;
    }

    public async getAllOrders(): Promise<IOrder[]> {
        return await this.OrderSchema.find();
    }

    public async getOrderById(id: string): Promise<IOrder> {
        const order = await this.OrderSchema.findById(id);
        if (!order) {
            throw new HttpException(404, 'Order_NOT_FOUND');
        }
        return order;
    }
}