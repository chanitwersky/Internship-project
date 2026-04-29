import { MongoClient } from "mongodb";

const STORE_DB_NAME = "store";
const DB_URL = "mongodb+srv://admin:IAMtPqAgEbYry13b@cluster0.tacudbw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export default class DbConn {
    private client: MongoClient;
    
    constructor() { }

    async init() {
        console.log("INIT DB");
        this.client = await MongoClient.connect(DB_URL);
    }

    getStoreDb() {
        return this.client.db(STORE_DB_NAME);
    }

    async terminate() {
        await this.client.close();
    }
}