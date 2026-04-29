import { Router, Request, Response } from "express";
import { Bus } from "./bus";
import Validations from "./validations";
import BusMiddlewares from "./middlewares";

export default class BusesApi {
    public router: Router;
    private buses: Bus[] = [];
    constructor() {
        this.router = Router();
    }

    public init() {
        this.router.use(BusMiddlewares.logBusRequest);
        this.setRoutes();
    }

    private setRoutes() {
        this.router.get("/", (req: Request, res: Response) => {
            res.send(this.buses);
        });

        this.router.post("/", BusMiddlewares.validateBus, (req: Request, res: Response) => {
            const bus = req.body as Bus;

            this.buses.push(bus);
            res.status(201).end();
        });

        this.router.put("/:id", BusMiddlewares.validateBus, (req: Request, res: Response) => {
            const busId = req.params.id;
            const bus = req.body as Bus;

            if (bus.number == 50) {
                throw Error("Bus number is 50!!!");
            }

            const busIdx = this.buses.findIndex(b => b.id == busId);
            if (busIdx == -1) {
                res.status(404).send("Bus id does not exist");
            }
            
            this.buses[busIdx] = bus;
            res.end();
        });
    }
}