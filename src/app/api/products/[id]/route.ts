import prisma from "@/lib/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
     const id = Number(params.id);

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 }
      );
    }

    const inventories = await prisma.inventory.findMany({
      where: { productId: id },
      select: {
        warehouse: {
          select: {
            id: true,
            name: true,
            pincode: true,
            _count: {
              select: { deliveryPersons: true },
            },
          },
        },
      },
      orderBy: { id: "desc" },
    });

    const availableInventory = inventories.map((inv) => ({
      warehouseName: inv.warehouse.name,
      pincode: inv.warehouse.pincode,
      deliveryPersonCount: inv.warehouse._count.deliveryPersons,
    }));

    return NextResponse.json({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      availableInventory,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch the product" },
      { status: 500 }
    );
  }
}
