
import { DeliveryPerson, InventoryData, OrderData, Warehouse , OrderStatusData, RatingData } from "@/types";
import { api } from "./client"
import { randomBytes } from "crypto";

export const getAllProducts = async() => {
    const response = await api.get('/products')
    return await response.data;
}

export const createProduct = async(data: FormData) => {
    const response = await api.post('/products' , data , {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }) 
    return response.data;
}


export const getSingleProduct = async(id: string) => {
    const response = await api.get(`/products/${id}`)
    return await response.data;
}

export const getAllWarehouses = async() => {
    const response = await api.get('/warehouses');
    return await response.data;
}

export const createWarehouses = async(data : Warehouse) => {
    const response = await api.post('/warehouses' , data)
    return response.data
}

export const getAllDeliveryPersons = async() => {
    const response = await api.get('delivery-persons');
    return await response.data;
}


export const createDeliveryPerson = async (data: DeliveryPerson) => {
    const response = await api.post('delivery-persons' , data)
    return await response.data;
}


export const createInventory = async(data: InventoryData) => {
    const response = await api.post('/inventories' , data);
    return response.data;
}

export const getAllInventories = async() => {
    const response = await api.get('/inventories')
    return await response.data;
}

export const placeOrder = async (data: OrderData ) => {
    const response = await api.post('/orders' , data)
    return await response.data;
}

export const getAllOrders = async() => {
    const response = await api.get('/orders')
    return await response.data;
}

export const changeOrderStatus = async (data: OrderStatusData) => {
    const response = await api.patch(`/orders/status`, data);
    return await response.data;
};

export const getMyOrders = async() => {
    const response = await api.get('/orders/history');
    return await response.data;
}

export const getWarehouseByPostcode = async(postcode:string) => {
    const response = await api.get(`/warehouses?postcode=${postcode}`);
    return await response.data; 
}

export const submitRating = async(data:RatingData) => {
    try {
        const response = await api.post(`/products/rating` , data)
        return await response.data
    } catch (error) {
        console.log(error)
        return error
    }
}