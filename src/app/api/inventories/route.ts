import { authOptions } from "@/lib/auth/authOptions";
import prisma from "@/lib/db/db";
import { inventorySchema } from "@/lib/validators/inventorySchema";
import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  const session = await getServerSession(authOptions)

  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  
  if (session.user?.role !== 'admin') {
    return Response.json({ message: 'Not allowed' }, { status: 403 });
  }
  
  const reqData = await request.json();

  let validatedData;

  try {
    validatedData = await inventorySchema.parse(reqData);
  } catch (err) {
    return Response.json({ message: err }, { status: 400 });
  }

  try {
    console.log("validated data", validatedData);
    const data = await prisma.inventory.create({
      data: {
        sku: validatedData.sku,
        productId: validatedData.productId,
        warehouseId: validatedData.warehouseId,
      },
    });

    console.log("Store Data", data);

    return Response.json({ message: "OK" }, { status: 201 });
  } catch (err) {
    console.log("error: ", err);
    // todo: check database status code, and if it is duplicate value code then send the message to the client.
    return Response.json(
      { message: "Failed to store the inventory into the database" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const allInventories = await prisma.inventory.findMany({
      select: {
        id: true,
        sku: true,
        warehouse: {
          select: {
            name: true, // Fetch warehouse name
          },
        },
        product: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(allInventories);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch inventories" },
      { status: 500 }
    );
  }
}
