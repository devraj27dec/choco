export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
}

export interface Warehouse {
    id: number;
    name: string;
    pincode: string;
}


export interface DeliveryPerson {
    id: number;
    name: string;
    phone: string;
    warehouseId: number;
}