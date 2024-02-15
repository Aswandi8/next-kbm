import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import prisma from "@/prisma";
export const dynamic = "force-dynamic";
export const revalidate = 1;
import { revalidatePath } from "next/cache";
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    await connectToDatabase();
    const dataSparepart1 = await prisma.dataSparepart.create({
      data: {
        sparepart: data.sparepart,
        produksi: data.produksi,
        types: {
          create: data.types,
        },
      },
    });
    return NextResponse.json(
      {
        message: "Subkriteria created successfully",
        data: dataSparepart1,
      },
      {
        status: 201,
      }
    );
    console.log(dataSparepart1);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error,
      },
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const data = await prisma.dataType.findMany({
      include: { product: true },
    });
    const dataSparepart = JSON.parse(JSON.stringify(data));
    const path = request.nextUrl.pathname;
    revalidatePath(path);
    return NextResponse.json(
      {
        message: "Success",
        Data: dataSparepart,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error,
      },
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
