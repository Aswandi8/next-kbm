import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import prisma from "@/prisma";
import { revalidatePath } from "next/cache";
import jwt from "jsonwebtoken";
import { dataUrgentParams } from "@/types";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const path = request.nextUrl.pathname;
    revalidatePath(path);
    const data = await prisma.urgent.findMany();
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
    connectToDatabase();
    const data: dataUrgentParams = await request.json();
    const token = request.headers.get("Authorization") || "";
    if (token) {
      var decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
      if (decoded) {
        const existingUrgent = await prisma.urgent.findFirst({
          where: { nourgent: data.nourgent },
        });
        if (existingUrgent) {
          return NextResponse.json(
            {
              message: "No.Urgent already exists in the Database",
            },
            {
              status: 400,
            }
          );
        }
        const dataurgent = await prisma.urgent.create({
          data: {
            qty: data.qty,
            sparepartId: data.sparepartId,
            ket: data.ket,
            nourgent: data.nourgent,
          },
        });
        const path = request.nextUrl.pathname;
        revalidatePath(path);
        return NextResponse.json(
          {
            message: "Success",
            Data: dataurgent,
          },
          {
            status: 200,
          }
        );
      } else {
        return NextResponse.json(
          {
            message: "Not Acceptable",
          },
          {
            status: 406,
          }
        );
      }
    } else {
      return NextResponse.json(
        {
          message: "Unauthorized token",
        },
        {
          status: 401,
        }
      );
    }
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
