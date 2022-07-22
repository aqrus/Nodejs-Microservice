import mongoose from "mongoose";
import ITicket from './ticket.interface';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

const TicketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    orderId: {
        type: String
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
TicketSchema.set('versionKey', 'version');
TicketSchema.plugin(updateIfCurrentPlugin);
export default mongoose.model<ITicket & mongoose.Document>("Ticket", TicketSchema);
