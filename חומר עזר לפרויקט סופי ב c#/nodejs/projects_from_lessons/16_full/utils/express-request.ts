import { Employee } from "../employees/models";

declare global {
    namespace Express {
        interface Request {
            employeeId?: string;
            employee?: Employee;
        }
    }
}

export {};