import prisma from "@/lib/db/db";
import { NextRequest, NextResponse } from "next/server";
import { ratingSchema } from "@/lib/validators/productSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "customer") {
    return NextResponse.json({ message: "User Not Found " }, { status: 403 });
  }
  try {
    const body = await request.json();
    const validateData = ratingSchema.parse(body);

    // console.log(validateData)

    const product = await prisma.product.findUnique({
      where: { id: validateData.productId },
    });

    if (!product) {
      return NextResponse.json(
        { Message: "Product Not found" },
        { status: 404 }
      );
    }

    const updateProduct = await prisma.rating.create({
      data: {
        productId: validateData.productId,
        rating: validateData.rating,
        userId: session.user.id,
      },
    });

    console.log("Rating product", updateProduct);

    return NextResponse.json(
      { message: "Rating Submitted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Failed to submit rating" },
      { status: 200 }
    );
  }
}
