import { NextFunction, Request, Response } from "express"

export default class ErrorMiddleware {
    static errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
        console.log(err);

        res.status(500).send("Internal error in server, contact support team.");
    }
}