import express, {Express} from "express";
import DbConn from "./utils/db-conn";
import EmployeesDal from "./employees/employees-dal";
import EmployeesService from "./employees/employees-service";
import EmployeesApi from "./employees/employees-api";
import ErrorMiddleware from "./utils/error-middleware";

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

        const employeesDal = new EmployeesDal(this.dbConn);
        const employeesService = new EmployeesService(employeesDal);
        const employeesApi = new EmployeesApi(employeesService);

        this.setRoutes(employeesApi);
    }

    private setRoutes(employeesApi: EmployeesApi) {
        this.app.use(express.json());
        this.app.use("/api/employees", employeesApi.router);

        this.app.use(ErrorMiddleware.errorHandler);

        this.app.listen(PORT, HOST, () => {
            console.log(`Listening on: http://${HOST}:${PORT}`);
        });
    }

    async terminate() {
        if (this.dbConn) {
            await this.dbConn.terminate();
        }
    }
}