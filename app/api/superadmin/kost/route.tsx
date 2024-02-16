import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import prisma from "@/prisma";
export const dynamic = "force-dynamic";
import { revalidatePath } from "next/cache";
import { error } from "console";
import { kostParams } from "@/types";
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const data = await prisma.dataKost.findMany();
    const dataKost = JSON.parse(JSON.stringify(data));
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

    console.log(body);

    // Create a new entry in the "dataKost" table using Prisma
    const kriterias = await prisma.dataKost.create({
      data: body,
    });

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
    console.error("Error:", error);

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
