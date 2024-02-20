import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import prisma from "@/prisma";
import { revalidatePath } from "next/cache";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const allDataKost = await prisma.dataKost.findMany({
      include: {
        penilaians: {
          include: {
            kriterias: true,
            subKriterias: true,
          },
        },
      },
    });
    const dataKost = JSON.parse(JSON.stringify(allDataKost));
    const path = request.nextUrl.pathname;
    revalidatePath(path);
    return NextResponse.json(
      {
        message: "Success",
        Data: dataKost,
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