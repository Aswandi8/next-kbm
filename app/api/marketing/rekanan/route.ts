import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import prisma from "@/prisma";
import { revalidatePath } from "next/cache";
import jwt from "jsonwebtoken";
import { dataRekananParams } from "@/types";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const path = request.nextUrl.pathname;
    revalidatePath(path);
    const data = await prisma.rekanan.findMany();
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
    const data: dataRekananParams = await request.json();
    const token = request.headers.get("Authorization") || "";
    if (token) {
      var decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
      if (decoded) {
        const existingRekanan = await prisma.rekanan.findFirst({
          where: { nama: data.nama },
        });
        if (existingRekanan) {
          return NextResponse.json(
            {
              message: "Rekanan already exists in the Database",
            },
            {
              status: 400,
            }
          );
        }
        const datarekanan = await prisma.rekanan.create({
          data: {
            nama: data.nama,
            unit: data.unit,
          },
        });
        const path = request.nextUrl.pathname;
        revalidatePath(path);
        return NextResponse.json(
          {
            message: "Success",
            Data: datarekanan,
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
