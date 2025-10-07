import { isServer, productSchema } from "@/lib/validators/productSchema";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "node:path";
import prisma from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export async function POST(request: NextRequest) {

  const session = await getServerSession(authOptions)

  if (!session) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  if (session.user?.role !== 'admin') {
    return Response.json({ message: 'Not allowed' }, { status: 403 });
  }

  const data = await request.formData();

  let validatedData;
  try {
    validatedData = productSchema.parse({
      name: data.get("name"),
      description: data.get("description"),
      price: Number(data.get("price")),
      image: data.get("image"),
    });
  } catch (err) {
    return Response.json({ message: err }, { status: 400 });
  }
  
  const inputImage = isServer
    ? (validatedData.image as File)
    : (validatedData.image as FileList)[0];
  const filename = `${Date.now()}.${inputImage.name.split(".").slice(-1)}`; // choco.png 213123123123.png


  try {
    const buffer = Buffer.from(await inputImage.arrayBuffer());
    await writeFile(
      // @ts-ignore
      path.join(process.cwd(), "public/assets", filename),buffer);
  } catch (err) {
    return Response.json(
      { message: "Failed to save the file to fs" },
      { status: 500 }
    );
  }

  try {
    const product = await prisma.product.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        image: filename
      }
    })

    return NextResponse.json(product,{status: 201})
    
  } catch (err) {
    // todo: remove stored image from fs
    return Response.json(
      { message: "Failed to store product into the database" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allProducts = await prisma.product.findMany({
      orderBy: {
        id: "desc"
      },include: {
        _count: {
          select:{
            ratings:true
          }
        }
      }
    })
    return Response.json(allProducts);
  } catch (error) {
    return Response.json(
      { message: "Failed to store product into the database" },
      { status: 500 }
    );
  }
}
