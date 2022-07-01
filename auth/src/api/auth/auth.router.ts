import { IRoute } from "../../common/interfaces";
import { Router } from "express";

export default class AuthRoute implements IRoute {
    public path = '/api/v1/auth';
    public router = Router();

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
            (req, res) => {
                res.send('Hello World!');
            }
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
