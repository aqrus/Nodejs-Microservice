export interface ITicket {
    id: string;
    title: string;
    price: number;
    isReverved: () => Promise<boolean>;
}