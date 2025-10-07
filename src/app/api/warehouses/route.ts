import { authOptions } from "@/lib/auth/authOptions";
import prisma from "@/lib/db/db";
import { warehouseSchema } from "@/lib/validators/warehouseSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if(!session) {
    return NextResponse.json({message:"Unautorized"} , {status: 401})
  }

  if(session?.user.role !== "admin") {
    return NextResponse.json({message:"Unautorized"} , {status: 403})
  }

  const reqData = await request.json();

  let validatedData;

  try {
    validatedData = warehouseSchema.parse(reqData);
    console.log(validatedData);
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }

  try {
    await prisma.warehouse.create({
      data: validatedData,
    });

    return NextResponse.json({ message: "OK" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Failed to store the warehouse" }, { status: 500 });
  }
}



export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url)
  const postcode = searchParams.get("postcode")
  try {
    if(postcode){
      const warehouseByPostcode = await prisma.warehouse.findMany({
        orderBy: [
          {
            pincode:postcode ? "desc" : undefined
          },{
            name:"desc"
          }
        ],
        where: {
          OR : [
            {pincode : postcode}
          ]
        }
      })
      return NextResponse.json(warehouseByPostcode , {status: 200})
    }

    const allWarehouses = await prisma.warehouse.findMany();
    return NextResponse.json(allWarehouses);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch all warehouses" }, { status: 500 });
  }
}
