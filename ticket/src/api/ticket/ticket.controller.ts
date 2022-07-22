import { NextFunction, Request, Response } from "express";
import TicketDto from "./dtos/ticket.dto";
import ITicket from "./ticket.interface";
import TicketService from "./ticket.service";

export default class TicketController {
    TicketService = new TicketService();
    public createTickets = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: TicketDto = req.body;
            const newTicket: ITicket = await this.TicketService.createTicket(model);
            res.status(201).json(newTicket);
        } catch (error) {
            next(error);
        }
    }
    public updateTicket = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;
            const model: TicketDto = req.body;
            const updatedTicket: ITicket = await this.TicketService.updateTicket(id, model);
            res.status(200).json(updatedTicket);
        } catch (error) {
            next(error);
        }
    }
    public getAllTickets = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tickets = await this.TicketService.getAllTickets();
            res.status(200).json(tickets);
        } catch (error) {
            next(error);
        }
    }
    public getTicketById = async (req: Request, res: Response, next: NextFunction) => {
        const id: string = req.params.id;
        try {
            const ticket = await this.TicketService.getTicketById(id);
            res.status(200).json(ticket);
        } catch (error) {
            next(error);
        }
    }
}