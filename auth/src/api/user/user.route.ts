import { authMiddleware, authMiddlewareAdmin, validationMiddleware } from "../../common/middleware";
import { NextFunction, Request, Response, Router } from "express";
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
    private currentUserPath: string = this.path + '/current-user';
    private getAllUsersPath: string = this.path + '/all-users';
    private userPath: string = this.path + '/:id';
    
    private initializeRoutes() {
        this.router.post(
            this.registerPath,
            validationMiddleware(RegisterDto, true),
            this.userController.register
        );
        this.router.get(
            this.currentUserPath,
            authMiddleware,
            this.userController.getCurrentUser
        );
        this.router.get(
            this.getAllUsersPath,
            authMiddleware,
            // authMiddlewareAdmin,
            this.userController.getAllUsers
        );
        this.router.get(
            this.userPath,
            authMiddleware,
            authMiddlewareAdmin,
            this.userController.getUserById
        );
        this.router.put(
            this.userPath,
            authMiddleware,
            validationMiddleware(RegisterDto, true),
            this.userController.updateUser
        );
        this.router.delete(
            this.userPath,
            authMiddleware,
            authMiddlewareAdmin,
            this.userController.deleteUser
        );
    }
}
