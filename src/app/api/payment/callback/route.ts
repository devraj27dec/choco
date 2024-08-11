import { NextRequest } from "next/server";
import Stripe from "stripe";
import  {buffer} from "micro";
import { db } from "@/lib/db/db";
import { deliveryPersons, inventories, orders } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export const config = {
    api: {
      bodyParser: false,
    },
  };
  

export async function POST(request: Request) {
    const sig = request.headers.get('stripe-signature') || '';

  // Convert ReadableStream to Buffer
  const buffer = await request.arrayBuffer();
  const body = Buffer.from(buffer);


  let event;
  try {
    event = stripe.webhooks.constructEvent(body ,sig,process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return Response.json({ message: "Not allowed" }, { status: 403 });
  }

  const data = event.data.object as any; // The Stripe event data

  if (event.type === "payment_intent.succeeded") {
    try {
      // Update order status to 'paid'
      await db
        .update(orders)
        .set({ status: "paid" })
        .where(eq(orders.id, data.metadata.order_id));

      return Response.json({ message: "OK" }, { status: 200 });
    } catch (err) {
      console.error("Failed to update the order:", err);
      return Response.json(
        { message: "Failed to update an order" },
        { status: 500 }
      );
    }
  } else if (event.type === "payment_intent.payment_failed") {
    try {
      const orderId = parseInt(data.metadata.order_id);

      // Release delivery person
      await db
        .update(deliveryPersons)
        .set({ orderId: sql`NULL` })
        .where(eq(deliveryPersons.orderId, orderId));

      // Release inventory
      await db
        .update(inventories)
        .set({ orderId: sql`NULL` })
        .where(eq(inventories.orderId, orderId));

      // Delete the failed order
      await db.delete(orders).where(eq(orders.id, orderId));

      return Response.json({ message: "OK" }, { status: 200 });
    } catch (err) {
      console.error("Failed to handle payment failure:", err);
      return Response.json(
        { message: "Failed to handle payment failure" },
        { status: 500 }
      );
    }
  } else {
    console.log("Ignoring the event:", event.type);
    return Response.json({});
  }
}
