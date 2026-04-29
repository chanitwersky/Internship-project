import { Collection } from "mongodb";

import DbConn from "../utils/db-conn";
import { Product, ProductWithId } from "./models";

const PRODUCTS_COLLECTION_NAME = "products";

export default class ProductsDal {
    private productsCollection: Collection<Product>;

    constructor(private dbConn: DbConn) { }

    async init() {
        console.log("INIT DAL");
        const db = this.dbConn.getStoreDb();
        this.productsCollection = db.collection(PRODUCTS_COLLECTION_NAME);
    }

    async getAllProducts(): Promise<Array<Product>> {
        console.log("GET PRODUCTS");
        const products: Array<ProductWithId> = 
            await this.productsCollection
                .find()
                // .sort({price: 1})
                // .skip(20)
                // .limit(10)
                .toArray();
        products.forEach(p => {
            delete p._id;
        });

        return products;
    }

    async createProduct(product: Product) {
        await this.productsCollection.insertOne(product);
    }

    async deleteProduct(code: number): Promise<boolean> {
        const res = await this.productsCollection.deleteOne({code});

        if (res.deletedCount == 0) {
            return false;
        }

        return true;
    }
}