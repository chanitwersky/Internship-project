import { NextFunction, Request, Response } from "express";
import { Employee, EmployeeType } from "./models";

export default class EmployeeMiddlewares {
    static validateEmployeeId(req: Request, res: Response, next: NextFunction) {
        const employeeId = req.params.id;

        // TODO: validate israeli ID number
        if (!EmployeeMiddlewares.validateId(employeeId)) {
            return res.status(400).send("ID number is invalid");
        }

        req.employeeId = employeeId;
        next();
    }

    static validateEmployee(req: Request, res: Response, next: NextFunction) {
        const employee: Employee = req.body;

        const {status, error} = EmployeeMiddlewares.isEmployeeValid(employee);
        if (!status) {
            return res.status(404).send(error);
        }

        req.employee = employee;
        next();
    }

    private static isEmployeeValid(employee: Employee): {status: boolean, error: string} {
        if (!employee) {
            return {status: false, error: "Body is empty"};
        }

        if (!EmployeeMiddlewares.validateId(employee.id)) {
            return {status: false, error: "Employee ID is invalid"};
        }

        if (!employee.name || employee.name.length < 2 || employee.name.length > 50) {
            return {status: false, error: "Employee name is invalid"};
        }

        if (!employee.salary || typeof employee.salary !== 'number') {
            return {status: false, error: "Employee salary is invalid"};
        }

        if (!employee.type || !Object.values(EmployeeType).includes(employee.type)) {
            return {status: false, error: "Employee type is invalid"};
        }
        return {status: true, error: ""};
    }

    private static validateId(id: string): boolean {
        if (id && id.length === 9) {
            return true;
        }
        return false;
    }
}