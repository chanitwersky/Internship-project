import { Router, Request, Response } from "express";

export default class BusesApi {
    public router: Router;
    private buses: Bus[] = [];
    constructor() {
        this.router = Router();
    }

    public init() {
        this.setRoutes();
    }

    private setRoutes() {
        this.router.get("/", (req: Request, res: Response) => {
            res.send(this.buses);
        });

        this.router.post("/", (req: Request, res: Response) => {
            const bus = req.body as Bus;
            this.buses.push(bus);
            res.status(201).end();
        });
    }
}