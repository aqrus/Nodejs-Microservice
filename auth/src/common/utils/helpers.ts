import { Request } from "express";

export const isEmptyObject = (obj: object): boolean =>{
  return !Object.keys(obj).length;
};

export const setCookies = (req: Request, token: string) =>{
  req.session = {
    jwt: token
  }
}