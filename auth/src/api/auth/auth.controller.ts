import { Request, Response } from "express";
import authService from "./auth.service";

export default class AuthController {
    private authService = new authService();

    public login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await this.authService.login(email, password);
        if (user) {
            res.json(user);
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    }
}