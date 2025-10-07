import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/db/db";
export const runtime = "nodejs"; 
export const dynamic = "force-dynamic"; 


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});


export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature") || "";

  const buffer = await request.arrayBuffer();
  const body = Buffer.from(buffer);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response(JSON.stringify({ message: "Not allowed" }), { status: 403 });
  }

  const data = event.data.object as any;

  if (event.type === "payment_intent.succeeded") {
    try {
      await prisma.order.update({
        where: { id: data.metadata.order_id },
        data: { status: "paid" },
      });
      return new Response(JSON.stringify({ message: "OK" }), { status: 200 });
    } catch (err) {
      console.error("Failed to update the order:", err);
      return new Response(
        JSON.stringify({ message: "Failed to update an order" }),
        { status: 500 }
      );
    }
  } else if (event.type === "payment_intent.payment_failed") {
    try {
      const orderId = data.metadata.order_id;

      await prisma.$transaction([
        prisma.deliveryPerson.updateMany({
          where: { orderId },
          data: { orderId: null },
        }),
        prisma.inventory.updateMany({
          where: { orderId },
          data: { orderId: null },
        }),
        prisma.order.delete({
          where: { id: orderId },
        }),
      ]);
      return new NextResponse(JSON.stringify({ message: "OK" }), { status: 200 });
    } catch (err) {
      console.error("Failed to handle payment failure:", err);
      return new NextResponse(
        JSON.stringify({ message: "Failed to handle payment failure" }),
        { status: 500 }
      );
    }
  } else {
    console.log("Ignoring the event:", event.type);
    return new NextResponse(JSON.stringify({}));
  }
}
