import prisma from "@/lib/db/db";
import { NextResponse } from "next/server";




   
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id;

    try {
    const product = await prisma.product.findFirst({
        where: {
        id: id,  // Assuming 'id' is of type string in your schema
        },
    });

    if (!product) {
        return NextResponse.json({ message: "Product not found." }, { status: 404 });
    }

    return NextResponse.json(product);
    } catch (error) {
    return NextResponse.json({ message: "Failed to fetch the product" }, { status: 500 });
    }
}
    