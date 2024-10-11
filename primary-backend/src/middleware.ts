import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log("this is auth middleware");
    try {
    const token = req.headers.authorization as unknown as string;
    
    if(!token) {
        throw new Error("Authorization failed");
    }
    
    const extractedToken = token.split(" ")[1];

    if(!extractedToken) {
        throw new Error("Invalid credentials");
    }

    const payload = jwt.verify(extractedToken, JWT_SECRET)

    if(!payload) {
        throw new Error("Seems like you are not logged in.")
    }
    
    console.log(payload);
    // @ts-ignore
    req.id = payload.id;

    next();
    } catch(err: any) {
        console.log(err);
        res.status(403).json({
            ok: false,
            Error: err.message
        })
    }
}