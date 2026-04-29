import { Collection } from "mongodb";

import { Employee, EmployeeWithId } from "./models";
import DbConn from "../utils/db-conn";

const EMPLOYEES_COLLECTION_NAME = "employees";
export const EMPLOYEE_NOT_FOUND_ERROR = "Employee not found";
export const EMPLOYEE_ALREADY_EXISTS = "Employee already exists";

export default class EmployeesDal {
    private employeesCollection: Collection<Employee>
    constructor(dbConn: DbConn) {
        this.employeesCollection = dbConn.getCompanyDB().collection(EMPLOYEES_COLLECTION_NAME);
    }

    async getAll(): Promise<Array<Employee>> {
        const employees: Array<EmployeeWithId> = await this.employeesCollection.find({}, {
            // projection: {id: 1, salary: 1}
        }).toArray();
        employees.forEach(e => delete e._id);
        return employees;
    }

    async getById(id: string): Promise<Employee> {
        const employee: EmployeeWithId | null = await this.employeesCollection.findOne({id});
        if (!employee) {
            throw new Error(EMPLOYEE_NOT_FOUND_ERROR);
        }

        delete employee._id;
        return employee;
    }

    async create(employee: Employee): Promise<void> {
        const exists = await this.employeesCollection.findOne({id: employee.id});
        if (exists) {
            throw new Error(EMPLOYEE_ALREADY_EXISTS);
        }
        await this.employeesCollection.insertOne(employee);
    }

    async update(employee: Employee): Promise<void> {
        const res = await this.employeesCollection.updateOne({id: employee.id}, {$set: employee});
        if (!res.modifiedCount) {
            throw new Error(EMPLOYEE_NOT_FOUND_ERROR);
        }
    }

    async delete(id: string): Promise<void> {
        const res = await this.employeesCollection.deleteOne({id});
        if (!res.deletedCount) {
            throw new Error(EMPLOYEE_NOT_FOUND_ERROR);
        }
    }
}