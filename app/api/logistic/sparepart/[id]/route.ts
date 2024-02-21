import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/database";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const path = request.nextUrl.pathname;
    revalidatePath(path);
    const data = await prisma.dataSparepart.findUnique({
      where: { id: params.id },
    });
    if (!data) {
      return NextResponse.json(
        {
          message: "Not found",
        },
        {
          status: 404,
        }
      );
    }
    const getData = JSON.parse(JSON.stringify(data));
    return NextResponse.json(
      {
        message: "Success",
        Data: getData,
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
