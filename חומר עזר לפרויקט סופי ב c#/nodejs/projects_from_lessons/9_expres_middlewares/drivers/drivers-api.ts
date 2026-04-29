import { Router, Request, Response } from "express";
import { Driver } from "./driver";

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
        this.router.put("/:id", (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const driverIndex = this.drivers.findIndex(driver => driver.id === id);

        if (driverIndex === -1) {
            return res.status(404).send("Driver not found");
        } 

        const updatedDriver: Driver = req.body as Driver;
        this.drivers[driverIndex] = updatedDriver; // Update the driver
        res.status(204).end(); // No content to send back
    });
    this.router.delete("/:id", (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const driverIndex = this.drivers.findIndex(driver => driver.id === id);

        if (driverIndex === -1) {
            return res.status(404).send("Driver not found");
        }

        this.drivers.splice(driverIndex, 1); // Remove the driver from the array
        res.status(204).end(); // No content to send back
    });
}
    }
