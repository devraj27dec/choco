import { authOptions } from "@/lib/auth/authOptions";
import prisma from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Not allowed" }, { status: 401 });
  }

  try {
    const myOrders = await prisma.order.findMany({
      //@ts-ignore
      where: { id: Number(session.token.id) },
      select: {
        id: true,
        type: true,
        price: true,
        status: true,
        address: true,
        createdAt: true,
        product: {
          select: {
            name: true,
            image: true,
            description: true,
          },
        },
      },
    });
    return NextResponse.json(myOrders);
  } catch (error) {
    return Response.json(
      { message: "Failed to get my orders" },
      { status: 500 }
    );
  }
}
