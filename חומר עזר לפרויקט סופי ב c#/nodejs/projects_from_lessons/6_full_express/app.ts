import express, { Express, Request, Response } from "express";

const HOST = "127.0.0.1";
const PORT = 5000;

export default class App {
    private app: Express;
    constructor() {
        this.app = express();
    }

    public init() {
        this.app.use(express.json()); // For getting the body
        this.setRoutes();

        this.app.listen(PORT, HOST, () => {
            console.log(`Server is listening in http://${HOST}:${PORT}`);
        });
    }

    private setRoutes() {
        this.app.get("/api/users", (req: Request, res: Response) => {
            res.send([{}, {}]);
        });

        // SECURITY issue!!!
        this.app.get("/api/users/downloadReport/:imageName", (req: Request, res: Response) => {
            const imageName = req.params.imageName;
            console.log("Downloading file:", `./images/${imageName}.jpg`);
            res.download(`./images/${imageName}.jpg`);
        });

        // /api/users/5
        this.app.get("/api/users/:userId", (req: Request, res: Response) => {
            res.send(`GET user: ${req.params.userId}`);
        });

        this.app.get("/api/:resource/123", (req: Request, res: Response) => {
            res.send(`GET resource 123: ${req.params.resource}`);
        });

        this.app.post("/api/users", (req: Request, res: Response) => {
            const user: User = req.body;
            console.log("Added user to DB:", user.id);

            res.status(201).send("Added");
        });
    }
}