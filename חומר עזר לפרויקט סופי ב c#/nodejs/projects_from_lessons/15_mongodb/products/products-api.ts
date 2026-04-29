import {Request, Response, Router} from 'express';

import ProductsService from "./products-service";
import { Product } from './models';

export default class ProductsApi {
    public router: Router;
    constructor(private productsService: ProductsService) {}

    init() {
        this.router = Router();
        this.setRoutes();
    }

    setRoutes() {
        this.router.get("/", async (req: Request, res: Response) => {
            const products = await this.productsService.getAllProducts();
            res.send(products);
        });

        this.router.post("/", async (req: Request, res: Response) => {
            const product = req.body as Product;

            // TODO: validation
            const createdCode = await this.productsService.createProduct(product);
            res.status(201).send(createdCode);
        });

        this.router.delete("/:code",  async (req: Request, res: Response) => {
            const code = parseInt(req.params.code);

            if (code == undefined) {
                return res.status(404).send("Product code is invalid");
            }

            const deleted = await this.productsService.deleteProduct(code);
            if (!deleted) {
                return res.status(404).send("Product code not found");
            }

            res.end();
        });
    }
}