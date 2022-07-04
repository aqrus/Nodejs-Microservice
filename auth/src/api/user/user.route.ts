import { validationMiddleware } from "../../common/middleware";
import { Router } from "express";
import { IRoute } from "../../common/interfaces";
import RegisterDto from "./dtos/registerUser.dto";
import UserController from "./user.controller";

export default class UserRoute implements IRoute {
    public path = "/api/v1/user";
    public router = Router();
    private userController = new UserController();
    constructor (){
        this.initializeRoutes();
    }
    private registerPath: string = this.path + '/register';
    private initializeRoutes() {
        this.router.post(
            this.registerPath,
            validationMiddleware(RegisterDto, true),
            this.userController.register
        );
        this.router.get(
            this.path,
            (req, res) => {
                res.send('Hello World!');
            }
        );
    }
}
