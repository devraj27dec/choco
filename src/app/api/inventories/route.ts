import { db } from "@/lib/db/db";
import { inventories, products, warehouses } from "@/lib/db/schema";
import { inventorySchema } from "@/lib/validators/inventorySchema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const reqData = await request.json();

    let validateData;

    try {
        validateData = await inventorySchema.parse(reqData)
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }

    try {

        await db.insert(inventories).values(validateData);

        return NextResponse.json({message: "Ok"} , {status: 201})
        
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to store the inventory into the database' },
            { status: 500 }
        );
    }
}


export async function GET() {
    try {
        const allInventories = await db.select({
            id: inventories.id,
            sku: inventories.sku,
            warehouse: warehouses.name,
            proudct: products.name
        }).from(inventories)
        .leftJoin(warehouses , eq(inventories.warehouseId , warehouses.id))
        .leftJoin(products , eq(inventories.productId , products.id))
        .orderBy(desc(inventories.id))

        await NextResponse.json(allInventories)
        
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch inventories' }, { status: 500 });
    }
    
}


