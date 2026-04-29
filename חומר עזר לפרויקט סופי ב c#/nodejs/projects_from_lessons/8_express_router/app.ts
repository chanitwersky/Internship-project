import express, {Express} from "express";
import BusesApi from "./buses/buses-api";
import DriversApi from "./drivers/drivers-api";

const PORT = 5000;
const HOST = "127.0.0.1";

export default class App {
    private app: Express;
    
    private busesApi: BusesApi;
    private driversApi: DriversApi;

    constructor() {
        this.busesApi = new BusesApi();
        this.driversApi = new DriversApi();

        this.app = express();
    }

    public init() {
        this.busesApi.init();
        this.driversApi.init();

        this.app.use(express.json());

        this.app.use("/api/buses", this.busesApi.router);
        this.app.use("/api/drivers", this.driversApi.router);

        this.app.listen(PORT, HOST, () => {
            console.log(`Listening to server at: http://${HOST}:${PORT}`);
        });
    }
}