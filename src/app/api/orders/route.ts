import { authOptions } from "@/lib/auth/authOptions";
import prisma from "@/lib/db/db";
import { orderSchema } from "@/lib/validators/orderSchema";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PAYMENT_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: "Not Allowed" }), { status: 400 });
  }

  const reqData = await request.json();

  let validatedData;
  let transactionError: string = "";

  try {
    validatedData = orderSchema.parse(reqData);
  } catch (err) {
    return new Response(JSON.stringify({ message: err }), { status: 400 });
  }

  console.log("validated Data", validatedData);

  const warehouseRes = await prisma.warehouse.findFirst({
    where: { pincode: validatedData.pincode },
    select: { id: true },
  });

  if (!warehouseRes) {
    return new Response(JSON.stringify({ message: "No warehouse found" }), { status: 400 });
  }
  
  const productIdString = validatedData.productId
    ? String(validatedData.productId)
    : null;


  const foundProduct = await prisma.product.findFirst({
    //@ts-ignore
    where: { id: productIdString},
  });

  if (!foundProduct) {
    return new Response(JSON.stringify({ message: "No Product found" }), { status: 400 });
  }


  let finalOrder;


  try {
    finalOrder = await prisma.$transaction(async (tx) => {
      // Create the order
      const order = await tx.order.create({
        data: {
          ...validatedData,
          userId: session.user.id,
          //@ts-ignore
          price: foundProduct.price * validatedData.qty,
          status: "received",
        },
        select: { id: true, price: true },
      });


      const availableStock = await tx.inventory.findMany({
        where: {
          warehouseId: warehouseRes.id,
          productId: productIdString,
          orderId: null,
        },
        take: validatedData.qty,
        //@ts-ignore
        lock: { forUpdate: true, skipLocked: true },
      });

      if (availableStock.length < validatedData.qty) {
        transactionError = `Stock is low, only ${availableStock.length} products available`;
        throw new Error(transactionError);
      }

      const availablePerson = await tx.deliveryPerson.findFirst({
        where: {
          orderId: null,
          warehouseId: warehouseRes.id,
        },
        //@ts-ignore
        lock: { forUpdate: true },
      });

      if (!availablePerson) {
        transactionError = `Delivery person is not available at the moment`;
        throw new Error(transactionError);
      }

      // Update inventory and delivery person with orderId
      await tx.inventory.updateMany({
        where: { id: { in: availableStock.map((stock) => stock.id) } },
        data: { orderId: order.id },
      });

      await tx.deliveryPerson.update({
        where: { id: availablePerson.id },
        data: { orderId: order.id },
      });

      await tx.order.update({
        where: { id: order.id },
        data: { status: "reserved" },
      });

      return order;
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: transactionError || "Error while processing the transaction",
      }),
      { status: 500 }
    );
  }

  // Stripe payment session creation
  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: foundProduct.name },
            unit_amount: foundProduct.price * 100, // Stripe expects amounts in cents
          },
          quantity: validatedData.qty,
        },
      ],
      mode: "payment",
      success_url: `${process.env.APP_BASE_URL}/payment/success`,
      cancel_url: `${process.env.APP_BASE_URL}/payment/return`,
      metadata: { order_id: String(finalOrder?.id) },
    });

    return new Response(JSON.stringify({ paymentUrl: checkoutSession.url }), { status: 200 });
  } catch (err) {
    console.log("Error creating Stripe session:", err);
    return new Response(JSON.stringify({ message: "Failed to create Stripe session" }), { status: 500 });
  }
}

export async function GET() {
  const allOrders = await prisma.order.findMany({
    select: {
      id: true,
      product: { select: { name: true, id: true, image: true } },
      user: { select: { id: true, fname: true } },
      type: true,
      price: true,
      status: true,
      address: true,
      qty: true,
      createdAt: true,
    },
    orderBy: { id: "desc" },
  });

  return new Response(JSON.stringify(allOrders));
}
