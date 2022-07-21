enum OrderStatus {
    // when the order is created, but the
    // ticket is trying to order has not been reserved
    Created = 'created',

    // the ticket the order is trying to reserve has already been reserved, or when the user cancels the order
    // The order expires before payment
    Cancelled = 'cancelled',

    // The order has been reserved successfully
    AwaitingPayment = 'awaiting_payment',

    // The order has reserved the ticket and the user has provided payment successfully
    Complete = 'complete'
}

export default OrderStatus;