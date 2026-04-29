import { Request, Response, Router } from "express";
import EmployeesService from "./employees-service";
import EmployeeMiddlewares from "./employee-middlewares";
import { EMPLOYEE_ALREADY_EXISTS } from "./employees-dal";

export default class EmployeesApi {
    public router: Router;

    constructor(private employeesService: EmployeesService) {
        this.router = Router();
        this.setRoutes();
    }

    private setRoutes() {
        this.router.get("/", this.getAll.bind(this));
        this.router.get("/:id", EmployeeMiddlewares.validateEmployeeId, this.getById.bind(this));
        this.router.post("/", EmployeeMiddlewares.validateEmployee, this.create.bind(this));
        this.router.put("/:id", EmployeeMiddlewares.validateEmployeeId, EmployeeMiddlewares.validateEmployee, this.update.bind(this));
        this.router.delete("/:id", EmployeeMiddlewares.validateEmployeeId, this.delete.bind(this));
    }

    private async getAll(req: Request, res: Response) {
        const employees = await this.employeesService.getAll();
        res.send(employees);
    }

    private async getById(req: Request, res: Response) {
        const id = req.employeeId!;
        const employee = await this.employeesService.getById(id);

        if (!employee) {
            return res.status(404).end();
        }

        res.send(employee);
    }
    
    private async create(req: Request, res: Response) {
        const created = await this.employeesService.create(req.employee!);
        if (!created) {
            return res.status(400).send(EMPLOYEE_ALREADY_EXISTS);
        }

        res.status(201).end();
    }

    private async update(req: Request, res: Response) {
        if (req.employeeId !== req.employee?.id) {
            return res.status(400).send("Employee ID is wrong");
        }

        const updated = await this.employeesService.update(req.employee!);
        if (!updated) {
            return res.status(404).end();
        }

        res.end();
    }
    
    private async delete(req: Request, res: Response) {
        const deleted = await this.employeesService.delete(req.employeeId!);
        if (!deleted) {
            return res.status(404).end();
        }

        res.end();
    }
}