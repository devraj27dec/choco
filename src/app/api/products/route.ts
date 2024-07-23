import { productSchema } from "@/lib/validators/productSchema";
import { NextRequest, NextResponse } from "next/server";
import { unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    // Check user session
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ message: 'Not allowed' }, { status: 401 });
    // }

    // // Check user role
    // if (session.token.role !== 'admin') {
    //   return NextResponse.json({ message: 'Not allowed' }, { status: 403 });
    // }

    // Parse and validate form data
    const data = await request.formData();
    let validatedData;
    validatedData = productSchema.parse({
      name: data.get("name"),
      description: data.get("description"),
      price: Number(data.get("price")),
      image: data.get("image"),
    });

    // Handle image file
    // const inputImage = validatedData.image instanceof File ? validatedData.image : validatedData.image[0];
    const filename = `${Date.now()}.${validatedData.image.name.split(".").slice(-1)}`;
    const filePath = path.join(process.cwd(), "public/assets", filename);

    try {
      const buffer = Buffer.from(await validatedData.image.arrayBuffer());
      await writeFile(filePath, buffer);
    } catch (err) {
      return NextResponse.json(
        { message: "Failed to save the file to filesystem" },
        { status: 500 }
      );
    }

    // Insert product into the database

    try {
      await db.insert(products).values({ ...validatedData, image: filename });
    } catch (err) {
      // Remove stored image in case of failure
      try {
        await unlink(filePath);
      } catch (cleanupErr) {
        console.error("Failed to clean up file:", cleanupErr);
      }
      return NextResponse.json(
        { message: "Failed to store product in the database" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Product created successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
