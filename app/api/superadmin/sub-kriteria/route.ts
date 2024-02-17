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
    const data = await prisma.subKriteria.findMany({
      include: { kriterias: true },
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

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    // Parse the JSON body from the request
    const body: addSubkriteriaParams = await request.json();
    const existingKriteria = await prisma.subKriteria.findFirst({
      where: { subkriteria: body.subkriteria },
    });
    if (existingKriteria) {
      return NextResponse.json(
        {
          message: `Kriteria with this ${body.subkriteria} already exists in the Database`,
        },
        {
          status: 400,
        }
      );
    }
    // Create a new entry in the "dataKost" table using Prisma
    const kriterias = await prisma.subKriteria.create({
      data: {
        kriteriaId: body.kriteriaId,
        subkriteria: body.subkriteria,
        bobot: body.bobot,
      },
    });
    const path = request.nextUrl.pathname;
    revalidatePath(path);
    return NextResponse.json(
      {
        message: "Data created successfully",
        data: kriterias,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error || "An unexpected error occurred",
      },
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
