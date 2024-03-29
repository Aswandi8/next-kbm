import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import prisma from "@/prisma";
import { kostParams } from "@/types";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const path = request.nextUrl.pathname;
    revalidatePath(path);

    const startOfMonth = new Date();
    startOfMonth.setDate(1);

    const startOfNextMonth = new Date();
    startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);
    startOfNextMonth.setDate(1);

    const currentDate = new Date();

    const data = await prisma.dataKost.findMany({
      include: {
        penilaians: {
          where: {
            createdAt: {
              gte: startOfMonth,
              lt: currentDate,
            },
          },
        },
      },
    });

    // const data = await prisma.dataKost.findMany({
    //   include: { penilaians: true },
    // });
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
    const body: kostParams = await request.json();

    if (!body) {
      return NextResponse.json(
        {
          message: "Bad Request: Missing or invalid JSON body",
        },
        {
          status: 400,
        }
      );
    }
    // Create a new entry in the "dataKost" table using Prisma
    const kriterias = await prisma.dataKost.create({
      data: body,
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
