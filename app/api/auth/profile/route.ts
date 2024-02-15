import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import prisma from "@/prisma";
import jwt from "jsonwebtoken";
// export const dynamic = "force-dynamic";
// import { revalidatePath } from "next/cache";
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const token = request.headers.get("Authorization")?.split(" ")[1] || "";
    const verifyToken = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
    if (verifyToken) {
      return NextResponse.json(
        {
          message: "Access denied",
        },
        {
          status: 405,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "Access denied",
        },
        {
          status: 404,
        }
      );
    }
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
