import { authOptions } from "@/lib/auth/authOptions";
import { db } from "@/lib/db/db";
import { deliveryPersons, inventories, orders, products, warehouses } from "@/lib/db/schema";
import { orderSchema } from "@/lib/validators/orderSchema";
import { and, eq, inArray, isNull } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Not Allowed" }, { status: 400 });
  }

  let reqData = await request.json();

  // console.log('session' , session);

  let validatedData;
  let transactionError: string = '';

  try {
    validatedData = await orderSchema.parse(reqData);
  } catch (err) {
    return Response.json({ message: err }, { status: 400 });
  }

  console.log("validataed Data ", validatedData);

  const warehouseRes = await db
    .select({ id: warehouses.id })
    .from(warehouses)
    .where(eq(warehouses.pincode, validatedData.pincode));

  if (!warehouseRes.length) {
    return Response.json({ message: "No warehouse found" }, { status: 400 });
  }

  const foundProducts = await db
    .select()
    .from(products)
    .where(eq(products.id, validatedData.productId))
    .limit(1);

  if (!foundProducts.length) {
    return Response.json({ message: "No Product found" }, { status: 400 });
  }

  let finalOrder : any = null;
  try {
    finalOrder = await db.transaction(async (tx) => {
      // createOrder

      const order = await tx
        .insert(orders)

        .values({
            ...validatedData,
            // @ts-ignore
            userId: Number(session.token.id),
            price: foundProducts[0].price * validatedData.qty,
            // todo: move all statuses to enum or const
            status: 'received',
        })
        .returning({ id: orders.id, price: orders.price });



        const avilabelStock = await tx
        .select()
        .from(inventories)
        .where(
            and(
                eq(inventories.warehouseId , warehouseRes[0].id),
                eq(inventories.productId , validatedData.productId),
                isNull(inventories.orderId)
            )
        )
        .limit(validatedData.qty)
        .for('update' , { skipLocked : true})


        if(avilabelStock.length < validatedData.qty) {
            transactionError = `Stock is low, only ${avilabelStock.length} products available`
            tx.rollback();
            return;
        }

        const availablePersons = await tx
        .select()
        .from(deliveryPersons)
        .where(
            and(
                isNull(deliveryPersons.orderId),
                eq(deliveryPersons.warehouseId , warehouseRes[0].id)
            )
        )
        .for('update')
        .limit(1)

        if(!availablePersons.length) {
            transactionError = `Delivery person is not available at the moment`
            tx.rollback();
            return;
        }

        
        await tx
        .update(inventories)
        .set({orderId: order[0].id})
        .where(
            inArray(
                inventories.id,
                avilabelStock.map((stock) => stock.id)
            )
        )

        await tx
        .update(deliveryPersons)
        .set({orderId: order[0].id})
        .where(eq(deliveryPersons.id , availablePersons[0].id))


        await tx.update(orders).set({ status: 'reserved' }).where(eq(orders.id, order[0].id));

        return order[0];

        //<meta name="cryptomus" content="a552bb3c" />

    });
  } catch (error) {

    return Response.json(
        {
            message: transactionError ? transactionError : 'Error while db transaction',
        },
        { status: 500 }
    );

  }
}
