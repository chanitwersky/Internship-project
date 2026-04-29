import EmployeesDal, { EMPLOYEE_ALREADY_EXISTS, EMPLOYEE_NOT_FOUND_ERROR } from "./employees-dal";
import { Employee } from "./models";

export default class EmployeesService {
    constructor(private employeesDal: EmployeesDal) {}

    async getAll(): Promise<Array<Employee>> {
        return this.employeesDal.getAll();
    }

    async getById(id: string): Promise<Employee | null> {
        let employee: Employee | null;
        try {
            employee = await this.employeesDal.getById(id);
        } catch (err: any) {
            if (err.message == EMPLOYEE_NOT_FOUND_ERROR) {
                return null;
            }
            throw err;
        }

        return employee;
    }

    async create(employee: Employee): Promise<boolean> {
        try {
            await this.employeesDal.create(employee);
            return true;
        } catch (err: any) {
            if (err.message == EMPLOYEE_ALREADY_EXISTS) {
                return false;
            }
            throw err;
        }
    }

    async update(employee: Employee): Promise<boolean> {
        try {
            await this.employeesDal.update(employee);
            return true;
        } catch (err: any) {
            if (err.message == EMPLOYEE_NOT_FOUND_ERROR) {
                return false;
            }
            throw err;
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            await this.employeesDal.delete(id);
            return true;
        } catch (err: any) {
            if (err.message == EMPLOYEE_NOT_FOUND_ERROR) {
                return false;
            }
            throw err;
        }
    }
}