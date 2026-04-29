import { ObjectId } from "mongodb";

export enum EmployeeType {
    FULL_TIME = "fullTime",
    PART_TIME = "partTime",
    STUDENT = "student"
}

export interface EmployeeWithId extends Employee {
    _id?: ObjectId;
}

export interface Employee {
    id: string;
    name: string;
    salary: number;
    type: EmployeeType
}