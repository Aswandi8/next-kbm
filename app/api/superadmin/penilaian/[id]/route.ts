import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import { revalidatePath } from "next/cache"; // Correct import statement
import { connectToDatabase } from "@/lib/database";
export const dynamic = "force-dynamic";

type PenilaianParams = {
  kostId: string;
  nilai: number[];
  sumNilai: number;
};

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const body: PenilaianParams = await request.json();

    const startOfMonth = new Date();
    startOfMonth.setDate(1);

    const startOfNextMonth = new Date();
    startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);
    startOfNextMonth.setDate(1);

    const currentDate = new Date(); // Get the current date for more accurate comparison
    const existingPenilaian = await prisma.penilaian.findFirst({
      where: {
        kostId: params.id,
        createdAt: {
          gte: startOfMonth,
          lt: currentDate, // Use the current date for the upper limit
        },
      },
    });
    console.log(existingPenilaian);

    if (existingPenilaian) {
      return NextResponse.json(
        {
          message: `Kost sudah dilakukan penilaian bulan ini, harap melakukan penilaian bulan berikutnya`,
        },
        {
          status: 400,
        }
      );
    }
    const cek = await prisma.$transaction([
      prisma.penilaian.create({ data: body }),
    ]);

    const path = request.nextUrl.pathname;
    revalidatePath(path);

    return NextResponse.json(
      {
        message: "Data created successfully",
        data: cek,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error || "An unexpected error occurred", // Use the error.message property
      },
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
