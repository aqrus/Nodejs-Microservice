import mongoose from "mongoose";
import ITicket from './ticket.interface';
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
//create the paginated model
export default mongoose.model<ITicket & mongoose.Document>("Ticket", TicketSchema);
