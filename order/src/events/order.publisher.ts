import { Publisher, Subjects, IOrderCreatedEvent, IOrderCancelledEvent } from "@sgticket-common/common";

export class OrderCreatedPublisher extends Publisher<IOrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

export class OrderCanncelledPublisher extends Publisher<IOrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}