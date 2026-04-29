import { NextFunction, Request, Response } from "express";
import { Bus } from "./bus";

const VALID_CITIES = ["Jerusalem", "Beit Shemesh"];

export default class BusMiddlewares {
    static logBusRequest(req: Request, res: Response, next: NextFunction) {
        console.log(`New request to bus router: ${req.method} ${req.url}`);
        next();
    }

    static validateBus(req, res: Response, next: NextFunction) {
        const bus = req.body as Bus;
        if (bus.number < 1 || bus.number > 999) {
            return res.status(400).send("Bus number should be between 1 and 999");
        }

        if (!VALID_CITIES.includes(bus.city)) {
            return res.status(400).send("Bus city is invalid");
        }

        next();
    }
}