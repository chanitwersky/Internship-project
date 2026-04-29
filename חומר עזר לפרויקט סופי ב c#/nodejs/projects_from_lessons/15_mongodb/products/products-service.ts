import { Product } from "./models";
import ProductsDal from "./products-dal";

export default class ProductsService {
    constructor(private productsDal: ProductsDal) {}

    async getAllProducts(): Promise<Array<Product>> {
        try {
            return this.productsDal.getAllProducts();
        } catch (err) {
            console.log("Error while getting all products:", err);
            throw Error("Error returning products from DB");
        }
    }

    async createProduct(product: Product): Promise<number> {
        try {
            const code = Math.ceil(Math.random() * 100000);
            product.code = code;

            await this.productsDal.createProduct(product);
            return code;
        } catch (err) {
            console.log("Error while creating product:", err);
            throw Error("Error inserting product to DB");
        }
    }

    async deleteProduct(code: number): Promise<boolean> {
        try {
            return this.productsDal.deleteProduct(code);
        } catch (err) {
            console.log("Error while deleting product:", err);
            throw Error("Error deleting product in DB");
        }
    }
}