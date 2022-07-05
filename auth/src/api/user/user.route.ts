import { authMiddleware, authMiddlewareAdmin, validationMiddleware } from "../../common/middleware";
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
    private currentUserPath: string = this.path + '/current-user';
    private getAllUsersPath: string = this.path + '/all-users';
    private getUserPath: string = this.path + '/:id';
    private updateUserPath: string = this.path + '/update/:id';
    private deleteUserPath: string = this.path + '/delete/:id';
    
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
            authMiddlewareAdmin,
            this.userController.getAllUsers
        );
        this.router.get(
            this.getUserPath,
            authMiddleware,
            authMiddlewareAdmin,
            this.userController.getUserById
        );
        this.router.put(
            this.updateUserPath,
            authMiddleware,
            validationMiddleware(RegisterDto, true),
            this.userController.updateUser
        );
        this.router.delete(
            this.deleteUserPath,
            authMiddleware,
            authMiddlewareAdmin,
            this.userController.deleteUser
        );
    }
}
