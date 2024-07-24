import { db } from "@/lib/db/db";
import { deliveryPersons } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/delieveryPersonSchema";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request:NextRequest) {
    
    const reqData = await request.json()

    let validateData;
    try {

        validateData = await deliveryPersonSchema.parse(reqData);
        
    } catch (error) {
        return NextResponse.json({
            message:error
        } , {status: 400})
    }

    try {
        await db.insert(deliveryPersons).values(validateData);
        await NextResponse.json({message: 'OK'}, {status: 201})
        
    } catch (error) {
        return NextResponse.json({message: 'Failed to store the delivery person into the database'}, {status: 500})
        
    }
}