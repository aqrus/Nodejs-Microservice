import { OrderStatus } from '@sgticket-common/common';
export default interface IOrder {
    id: string;
    userId: string;
    status: OrderStatus;
    ticket: string;
    expiresAt: Date;
}
