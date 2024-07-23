import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schema";
import { warehouseSchema } from "@/lib/validators/warehouseSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const reqData = await request.json();

    let validatedData;

    try {
        validatedData = await warehouseSchema.parse(reqData);
        console.log(validatedData);
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 400 });
    }

    try {
        await db.insert(warehouses).values(validatedData);

        return NextResponse.json({ message: 'OK' }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: 'Failed to store the warehouse' }, { status: 500 });
    }
}


export async function GET() {
    try {
        const allwarehouses = await db.select().from(warehouses)
        return Response.json(allwarehouses);
    } catch (error) {
        return Response.json({ message: 'Failed to fetch all warehouses' }, { status: 500 });
    }
}