import { authOptions } from "@/lib/auth/authOptions";
import prisma from "@/lib/db/db";
import { orderStatusSchema } from "@/lib/validators/orderStatusSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req:NextRequest) {
    
    const session = await getServerSession(authOptions)

    if(!session) {
        return Response.json({ message: 'Not allowed' }, { status: 401 });
    }

    if(session.user.role !== 'admin') {
        return Response.json({ message: 'Not allowed' }, { status: 403 });
    }

    const reqData = await req.json();

    let validateData;
    
    try {
        validateData = orderStatusSchema.parse(reqData)
    } catch (error) {
        return NextResponse.json({message: error} , {status: 400})
    }

    try {
        await prisma.order.update({
            where: {id: validateData.orderId},
            data: {status: validateData.status}
        })
        return Response.json({ message: validateData.status }, { status: 200 });
    } catch (error) {
        return Response.json({ message: 'Failed to update the order status' }, { status: 500 });   
    }


}