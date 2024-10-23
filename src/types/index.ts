export interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
}

export interface Warehouse {
    id: string;
    name: string;
    pincode: string;
}


export interface DeliveryPerson {
    id: string;
    name: string;
    phone: string;
    warehouseId: string;
}

export interface Inventory {
    id: string;
    sku: string;
    warehouse: string;
    product: string;
}

export interface InventoryData {
    sku: string;
    warehouseId: string;
    productId: string;
}


export interface OrderData {
    productId: string;
    qty: number;
    pincode: string;
    address: string;
}



export interface MyOrder {
    id: string;
    image: string;
    price: number;
    product: string;
    address: string;
    productDescription: string;
    status: string;
    type: string;
    createdAt: string;
}

