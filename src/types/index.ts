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

export interface Inventory {
    id: string;
    sku: string;
    warehouse: number;
    product:  number;
}

export interface InventoryData {
    sku: string;
    warehouseId: number;
    productId: number;
}

export interface OrderData {
    productId: number;
    qty: number;
    pincode: string;
    address: string;
}

export interface Order {
    id: string;
    product: Product;
    user: string;
    type: string;
    address: string;
    status: string;
    price: number;
    qty: number;
}

export interface OrderStatusData {
    orderId: string;
    status: string;
}

export interface MyOrder {
    id:string;
    image: string;
    price: number;
    product: Product;
    address: string;
    productDescription: string;
    status: string;
    type: string;
    createdAt: string;
}