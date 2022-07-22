import { authMiddleware, authMiddlewareAdmin, validationMiddleware } from "@sgticket-common/common";
import { Router } from "express";
import { IRoute } from "@sgticket-common/common";
import TicketDto from "./dtos/ticket.dto";
import TicketController from "./ticket.controller";

export default class TicketRoute implements IRoute {
    public path = "/api/v1/ticket";
    public router = Router();
    private TicketController = new TicketController();
    constructor (){
        this.initializeRoutes();
    }
    private createTicketPath: string = this.path + '/';
    private getAllTicketPath: string = this.path + '/';
    private ticket: string = this.path + '/:id';
    
    private initializeRoutes() {
        this.router.post(
            this.createTicketPath,
            validationMiddleware(TicketDto, true),
            this.TicketController.createTickets
        );
        this.router.put(
            this.ticket,
            // authMiddlewareAdmin,
            validationMiddleware(TicketDto, true),
            this.TicketController.updateTicket
        );
        this.router.get(
            this.getAllTicketPath,
            authMiddleware,
            this.TicketController.getAllTickets
        );
        this.router.get(
            this.ticket,
            authMiddleware,
            // authMiddlewareAdmin,
            this.TicketController.getTicketById
        );
    }
}
