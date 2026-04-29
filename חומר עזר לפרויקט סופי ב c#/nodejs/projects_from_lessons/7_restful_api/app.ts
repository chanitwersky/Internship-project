import express, {Express, Request, Response} from "express";
import { Product } from "./product";

const HOST = "127.0.0.1";
const PORT = 5000;

export default class App {
    private app: Express;
    private products: Array<Product>;

    constructor() {
        this.app = express();

        this.products = [];
    }

    public init() {
        this.app.use(express.json()); // For body
        this.setRoutes();

        this.app.listen(PORT, HOST, () => {
            console.log(`Server is listening on: http://${HOST}:${PORT}`);
        });

    }

    private setRoutes() {
        this.app.get("/api/products", (req: Request, res: Response) => {
            res.send(this.products);
        });

        this.app.get("/api/products/:code", (req: Request, res: Response) => {
            const code = parseInt(req.params.code); // TODO: validate the code before parsing

            const product = this.products.find(p => p.code == code);
            if (!product) {
                res.status(404).send("Product was not found");
            }

            res.send(product);
        });

        this.app.post("/api/products", (req: Request, res: Response) => {
            const product: Product = req.body;
            // TODO: add validation check

            this.products.push(product);
            res.status(201).end();
        });

        this.app.put("/api/products/:code", (req: Request, res: Response) => {
            const code = parseInt(req.params.code); // TODO: validate the code before parsing

            const productIndex = this.products.findIndex(p => p.code == code);
            if (productIndex == -1) {
                res.status(404).send("Product was not found");
            }

            const product: Product = req.body;
            // TODO: add validation check

            this.products[productIndex] = product;
            res.end();
        });

       this.app.delete("/api/products/:code", (req: Request, res: Response) => {
        const code = parseInt(req.params.code); // TODO: validate the code before parsing

        const productIndex = this.products.findIndex(p => p.code === code);
        if (productIndex === -1) {
            return res.status(404).send("Product was not found");
        }

        this.products.splice(productIndex, 1); // Remove the product from the array
        res.status(204).end(); // No content to return
    });
}
    }
