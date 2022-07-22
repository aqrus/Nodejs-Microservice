import { OrderStatus } from "@sgticket-common/common";
import { OrderSchema } from "../order";
import mongoose from "mongoose";
import { ITicket } from "./ticket.interface";

const TicketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v
        }
    },
    timestamps: true
});

TicketSchema.methods.isReserved = async function() {
    const existingOrder = await OrderSchema.findOne({
        ticket: this.id,
        status: {
            $in: [
                OrderStatus.Created,
                OrderStatus.AwaitingPayment,
                OrderStatus.Complete
            ]
        }
    });
    return !!existingOrder;
};

export default mongoose.model<ITicket & mongoose.Document>("Ticket", TicketSchema);
