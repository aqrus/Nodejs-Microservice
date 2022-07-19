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
            };
            res.status(201).json(user)
        }catch (error){
            next(error);
        }   
    }

    public getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.user.id;
            const user = await this.UserService.getCurrentUser(id);
            res.status(200).json(user);
        }catch (error){
            next(error);
        }
    }

    public getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.UserService.getAllUsers();
            res.status(200).json(users);
        }catch (error){
            next(error);
        }
    }

    public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const user = await this.UserService.getUserById(id);
            res.status(200).json(user);
        }catch (error){
            next(error);
        }
    }

    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const model: RegisterDto = req.body;
            const image = req.files;
            const updateUser = await this.UserService.updateUser(id, model, image);
            res.status(200).json(updateUser);
        }catch (error){
            next(error);
        }
    }

    public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            const user = await this.UserService.deleteUser(id);
            res.status(200);
        }catch (error){
            next(error);
        }
    }
}