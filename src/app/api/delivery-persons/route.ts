import { authOptions } from "@/lib/auth/authOptions";
import prisma from "@/lib/db/db";
import { deliveryPersonSchema } from "@/lib/validators/delieveryPersonSchema";
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
  const data = await request.json();

  let validateData;
  try {
    validateData = await deliveryPersonSchema.parse(data);
  } catch (err) {
    return NextResponse.json({ message: String(err) }, { status: 400 });
  }
  console.log("validatedData" , validateData);

  
  try {
    const data = await prisma.deliveryPerson.create({
      data: {
        warehouseId: validateData.warehouseId,
        name: validateData.name, 
        phone: validateData.phone,
      },
    });
    console.log("data" , data)
    return NextResponse.json({...data , message: "OK" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to store the delivery person into the database" },
      { status: 500 }
    );
  }
}

// GET: Fetch all delivery persons
export async function GET() {
  try {
    const allDeliveryPersons = await prisma.deliveryPerson.findMany({
      select: {
        id: true,
        name: true,
        phone: true,
        warehouse: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(allDeliveryPersons);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch delivery persons" },
      { status: 500 }
    );
  }
}
