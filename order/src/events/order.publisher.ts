import { Publisher, Subjects } from "@sgticket-common/common";
import { IOrderCreatedEvent, IOrderCancelledEvent } from "./order.interface";

export class OrderCreatedPublisher extends Publisher<IOrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

export class OrderCanncelledPublisher extends Publisher<IOrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}