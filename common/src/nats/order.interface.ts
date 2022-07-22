import Subjects  from "./subject.nats";
import OrderStatus from "./order-status.nats";

export interface IOrderCreatedEvent {
    subject: Subjects.OrderCreated;
    data: {
        id: string;
        version: number;
        status: OrderStatus;
        userId: string;
        expiresAt: string;
        ticket: {
            id: string,
            price: number
        };
    };
}

export interface IOrderCancelledEvent {
    subject: Subjects.OrderCancelled;
    data: {
        id: string;
        version: number;
        ticket: {
            id: string
        };
    };
}