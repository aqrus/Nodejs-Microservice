import mongoose from "mongoose";
import IOrder from './order.interface';
import { OrderStatus } from '@sgticket-common/common';
const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus),
        default: OrderStatus.Created
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    },
    expiresAt: {
        type: mongoose.Schema.Types.Date
    },
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
//create the paginated model
export default mongoose.model<IOrder & mongoose.Document>("Ticket", OrderSchema);
