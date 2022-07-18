import { IRoute } from "@sgticket-common/common";
import { Router } from "express";
import AuthController from "./auth.controller";
import { authMiddleware, validationMiddleware } from "@sgticket-common/common";
import LoginDto from "./dtos/auth.dto";

export default class AuthRoute implements IRoute {
    public path = '/api/v1/auth';
    public router = Router();
    private authController = new AuthController();
    constructor (){
        this.initializeRoutes();
    }

    private signingPath: string = this.path + '/signing';
    private logoutPath: string = this.path + '/logout';

    private initializeRoutes() {
        this.router.post(
            this.signingPath,
            validationMiddleware(LoginDto, true),
            this.authController.login
        );
        this.router.post(
            this.logoutPath,
            authMiddleware,
            this.authController.logout
        );
    }
}
