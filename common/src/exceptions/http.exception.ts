class HttpException extends Error{     //Error in library type script
  public status: number;
  public message: string;

  constructor(status: number, message: string){
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default HttpException;