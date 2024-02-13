import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import prisma from "@/prisma";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    // const data = await prisma.user.findMany({}, { "id": 0, "password": 0 });
    const data = await prisma.user.findMany({
      select: { username: true, email: true, role: true, type: true },
      where: {
        role: {
          notIn: ["admin"],
        },
      },
    });
    const dataUsers = JSON.parse(JSON.stringify(data));
    return NextResponse.json(
      {
        message: "Success",
        Data: dataUsers,
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
