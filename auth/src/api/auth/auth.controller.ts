import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";

export default class AuthController {
    private authService = new authService();

    public login = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        try {
            const user = await this.authService.login(email, password);
            req.session = {
                jwt: user.getJWToken()
            }
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    public logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.session = null;
            res.status(200).send({});
        } catch (error) {
            next(error);
        }
    }
}