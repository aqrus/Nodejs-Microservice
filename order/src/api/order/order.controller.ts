import { NextFunction, Request, Response } from "express";
import OrderDto from "./dtos/order.dto";
import IOrder from "./order.interface";
import OrderService from "./order.service";

export default class OrderController {
    OrderService = new OrderService();
    public createOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: OrderDto = req.body;
            const userId = req.user.id;
            const newOrder: IOrder = await this.OrderService.createOrder(userId, model);
            res.status(201).json(newOrder);
        } catch (error) {
            next(error);
        }
    }
    public getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id;
            const Orders = await this.OrderService.getAllOrders(userId);
            res.status(200).json(Orders);
        } catch (error) {
            next(error);
        }
    }
    public getOrderById = async (req: Request, res: Response, next: NextFunction) => {
        const id: string = req.params.id;
        try {
            const order = await this.OrderService.getOrderById(id);
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }
    public cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
        const id: string = req.params.id;
        const UserId: string = req.user.id;
        try {
            const order = await this.OrderService.cancelOrder(id, UserId);
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }
}