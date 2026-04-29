import { Router, Request, Response } from "express";

export default class DriversApi {
    public router: Router;
    private drivers: Driver[] = [];

    constructor() {
        this.router = Router();
    }

    public init() {
        this.setRoutes();
    }

    private setRoutes() {
        this.router.get("/", (req: Request, res: Response) => {
            res.send(this.drivers);
        });

        this.router.post("/", (req: Request, res: Response) => {
            const driver = req.body as Driver;
            this.drivers.push(driver);
            res.status(201).end();
        });
    }
}