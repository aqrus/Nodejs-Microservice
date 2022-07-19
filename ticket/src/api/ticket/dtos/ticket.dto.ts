import {IsNotEmpty, IsInt, Min} from 'class-validator';
export default class TicketDto{

  @IsNotEmpty()
  public title: string;
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  public price: number;

  constructor(title: string, price: number){
    this.title = title;
    this.price = price
  }
}