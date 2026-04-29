import { ObjectId } from "mongodb";

export interface Product {
    code?: number;
    name: string;
    description?: string;
    price: number;
    amount: number;
}

export interface ProductWithId extends Product {
    _id?: ObjectId;
}