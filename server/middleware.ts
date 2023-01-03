import { NextFunction, Request, Response } from "express";

export const logger = (req:Request, res:Response, next:NextFunction) => {
    console.log("I am a logger");
    next()
}