import express, {Express} from "express";
import DbConn from "./utils/db-conn";
import ProductsDal from "./products/products-dal";
import ProductsService from "./products/products-service";
import ProductsApi from "./products/products-api";

const HOST = "127.0.0.1";
const PORT = 5000;

export default class App {
    private app: Express;
    private dbConn: DbConn;
    constructor() {
        this.app = express();
    }

    async init() {
        this.dbConn = new DbConn();
        await this.dbConn.init();

        const productsApi = this.initProducts();

        this.app.use(express.json());
        this.app.use("/api/products", productsApi.router);

        this.app.listen(PORT, HOST, () => {
            console.log(`Server listening on: http://${HOST}:${PORT}/`);
        });
    }

    initProducts(): ProductsApi {
        const productsDal = new ProductsDal(this.dbConn);
        productsDal.init();
        const productsService = new ProductsService(productsDal);
        const productsApi = new ProductsApi(productsService);
        productsApi.init();
        return productsApi;
    }

    async terminate() {
        console.log("CLOSE DB");
        await this.dbConn.terminate();
    }
}