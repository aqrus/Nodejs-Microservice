export interface ITicket {
    id: string;
    title: string;
    price: number;
    version: number;
    isReverved: () => Promise<boolean>
}