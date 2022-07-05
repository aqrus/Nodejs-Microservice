import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";
import { setCookies } from "../../common/utils";

export default class AuthController {
    private authService = new authService();

    public login = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        try {
            const user = await this.authService.login(email, password);
            setCookies(req, user.getJWToken());
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}