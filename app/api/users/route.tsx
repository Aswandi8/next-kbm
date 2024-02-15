import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import prisma from "@/prisma";
export const dynamic = "force-dynamic";
import { revalidatePath } from "next/cache";
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const data = await prisma.user.findMany({
      where: {
        role: {
          notIn: ["admin"],
        },
      },
    });
    const dataUsers = JSON.parse(JSON.stringify(data));
    const path = request.nextUrl.pathname;
    revalidatePath(path);
    return NextResponse.json(
      {
        message: "Success",
        Data: dataUsers,
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
