import { NextFunction, Request, Response } from "express";
import RegisterDto from "./dtos/registerUser.dto";
import UserService from "./user.service";

export default class UserController {
    private UserService = new UserService();
    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: RegisterDto = req.body;
            const image = req.files;
            const user = await this.UserService.register(model, image);
            req.session = {
                jwt: user.getJWToken()
            }
            res.status(201).json(user)
        }catch (error){
            next(error);
        }
        
    }
}