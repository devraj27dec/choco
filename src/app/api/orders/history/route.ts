import { authOptions } from "@/lib/auth/authOptions";
import prisma from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Not allowed" }, { status: 401 });
  }

  

  try {
    const myOrders = await prisma.order.findMany({
      where:{userId: session.user.id},
      select: {
        id: true,
        type: true,
        price: true,
        status: true,
        address: true,
        createdAt: true,
        product: {
          select: {
            id: true,
            name: true,
            image: true,
            description: true,
          },
        },
      },
      orderBy: {id:"desc"}
    });

    console.log("My Orders Response:", myOrders);

    return NextResponse.json(myOrders);
  } catch (error) {
    console.error("error" , error)
    return Response.json(
      { message: "Failed to get my orders" },
      { status: 500 }
    );
  }
}
