import { IRoute } from "../../common/interfaces";
import { Router } from "express";
import AuthController from "./auth.controller";
import { validationMiddleware } from "../../common/middleware";
import LoginDto from "./dtos/auth.dto";

export default class AuthRoute implements IRoute {
    public path = '/api/v1/auth';
    public router = Router();
    private authController = new AuthController();
    constructor (){
        this.initializeRoutes();
    }

    private signingPath: string = this.path + '/signing';
    private signoutPath: string = this.path + '/signout';
    private signupPath: string = this.path + '/signup';
    private currentUserPath: string = this.path + '/me';

    private initializeRoutes() {
        this.router.post(
            this.signingPath,
            validationMiddleware(LoginDto, true),
            this.authController.login
        );
        this.router.post(
            this.signupPath,
            (req, res) => {
                res.send('Hello World!');
            }
        );
        this.router.get(
            this.currentUserPath,
            (req, res) => {
                res.send('Hello World!');
            }
        );
        this.router.get(
            this.signoutPath,
            (req, res) => {
                res.send('Hello World!');
            }
        );
    }
}
