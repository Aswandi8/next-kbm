import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import prisma from "@/prisma";
import { revalidatePath } from "next/cache";
import jwt from "jsonwebtoken";
import { dataTrackingParams } from "@/types";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const path = request.nextUrl.pathname;
    revalidatePath(path);
    const data = await prisma.tracking.findMany();
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
    const data: dataTrackingParams = await request.json();
    const token = request.headers.get("Authorization") || "";
    if (token) {
      var decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
      if (decoded) {
        const existingTracking = await prisma.tracking.findFirst({
          where: { notracking: data.notracking },
        });
        if (existingTracking) {
          return NextResponse.json(
            {
              message: "No.Tracking already exists in the Database",
            },
            {
              status: 400,
            }
          );
        }
        const datatracking = await prisma.tracking.create({
          data: {
            sparepartId: data.sparepartId,
            rekananId: data.rekananId,
            notracking: data.notracking,
          },
        });
        const path = request.nextUrl.pathname;
        revalidatePath(path);
        return NextResponse.json(
          {
            message: "Success",
            Data: datatracking,
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
