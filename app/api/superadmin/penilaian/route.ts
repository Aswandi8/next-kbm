import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import prisma from "@/prisma";
import { addSubkriteriaParams, subkriteriaParams } from "@/types";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const path = request.nextUrl.pathname;
    revalidatePath(path);
    const data = await prisma.penilaian.findMany({
      include: { kosts: true },
    });
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
