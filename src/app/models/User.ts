export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    owner: string;
    cardNumber: number;
    cvv: number;
    expiry: Date;
}