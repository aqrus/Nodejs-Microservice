export default interface ITicket {
    id: string;
    title: string;
    price: number;
    userId: string;
    version: number;
    orderId?: string;
}
