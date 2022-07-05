import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { TokenData } from '../interfaces';
import { HttpException, messageException } from '../exceptions';
import { constant } from '@common/utils';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.jwt) {
        const user = jwt.verify(req.session.jwt, process.env.JWT_SECRET!) as TokenData;
        req.user.id = user.id;
        req.user.role = user.role;
        next();
    } else {
        throw new HttpException(401,messageException.msg_004);
    }
}

export const authMiddlewareAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role === constant.userRole.admin) {
        next();
    } else {
        throw new HttpException(401,messageException.msg_004);
    }
}