import { NextFunction, Request, Response } from "express";
import RegisterDto from "./dtos/registerUser.dto";
import UserService from "./user.service";

export default class UserController {
    private UserService = new UserService();
    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: RegisterDto = req.body;
            const a = await this.UserService.register(model)
            return model
        }catch (error){
            next(error);
        }
        
    }
}