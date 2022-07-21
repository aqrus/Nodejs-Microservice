import { authMiddleware, authMiddlewareAdmin, validationMiddleware } from "@sgticket-common/common";
import { Router } from "express";
import { IRoute } from "@sgticket-common/common";
import TicketDto from "./dtos/order.dto";
import OrderController from "./order.controller";

export default class OrderRoute implements IRoute {
    public path = "/api/v1/order";
    public router = Router();
    private OrderController = new OrderController();
    constructor (){
        this.initializeRoutes();
    }
    private createOrderPath: string = this.path + '/';
    private getAllOrderPath: string = this.path + '/';
    private order: string = this.path + '/:id';
    
    private initializeRoutes() {
        this.router.post(
            this.createOrderPath,
            validationMiddleware(TicketDto, true),
            this.OrderController.createOrder
        );
        this.router.get(
            this.getAllOrderPath,
            authMiddleware,
            this.OrderController.getAllOrders
        );
        this.router.get(
            this.order,
            authMiddleware,
            // authMiddlewareAdmin,
            this.OrderController.getOrderById
        );
    }
}
