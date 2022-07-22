import { OrderStatus, Subjects } from "@sgticket-common/common";

export interface IOrderCreatedEvent {
    subject: Subjects.OrderCreated;
    data: {
        id: string;
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
        status: OrderStatus;
        ticket: {
            id: string
        };
    };
}