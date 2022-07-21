import { OrderStatus } from '@sgticket-common/common';
export default interface IOrder {
    _id: string;
    userId: string;
    status: OrderStatus;
    ticketId: string;
    expiresAt: Date;
}
