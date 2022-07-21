import {IsNotEmpty, IsInt, Min} from 'class-validator';
export default class OrderDto{
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    public userId: number;
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    public status: number;
    @IsNotEmpty()
    public ticketId: string;

    constructor(userId: number, status: number, ticketId: string){
        this.userId = userId;
        this.status = status;
        this.ticketId = ticketId;
    }
}