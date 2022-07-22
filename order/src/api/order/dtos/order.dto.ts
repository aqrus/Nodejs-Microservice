import {IsNotEmpty, IsInt, Min } from 'class-validator';
export default class OrderDto{
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    public status: number;
    @IsNotEmpty()
    public ticketId: string;

    constructor(status: number, ticketId: string){
        this.status = status;
        this.ticketId = ticketId;
    }
}