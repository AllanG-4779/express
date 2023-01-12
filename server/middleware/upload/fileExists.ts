import { Request, Response, NextFunction } from "express";

export const filePayloadExists = (req:Request, res:Response, next:NextFunction)=>{
    if(!req.files ){
        return res.status(400).json({message:"Missing file to upload"})
    }
    next()
}