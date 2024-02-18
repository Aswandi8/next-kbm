import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import prisma from "@/prisma";
import { kriteriaParams } from "@/types";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const path = request.nextUrl.pathname;
    revalidatePath(path);
    const data = await prisma.kriteria.findMany({
      include: {
        subkriterias: true,
      },
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
    const { kriteria, bobot } = await request.json();
    const existingKriteria = await prisma.kriteria.findFirst({
      where: { kriteria: kriteria },
    });
    console.log(existingKriteria);
    if (existingKriteria) {
      return NextResponse.json(
        {
          message: `Kriteria with this ${kriteria} already exists in the Database`,
        },
        {
          status: 400,
        }
      );
    }

    // Create a new entry in the "dataKost" table using Prisma
    const kriterias = await prisma.kriteria.create({
      data: {
        kriteria,
        bobot,
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
