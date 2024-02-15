import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import prisma from "@/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";
export const dynamic = "force-dynamic";
import { revalidatePath } from "next/cache";
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1] || "";
    if (!token) {
      return NextResponse.json(
        {
          message: "Unauthorized - Token not provided",
        },
        {
          status: 401,
        }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || ""
    ) as JwtPayload;

    // Perform any additional checks on the decoded token if needed

    await connectToDatabase();
    const dataProfile = await prisma.user.findFirst({
      where: { id: decoded.id },
    });
    const path = request.nextUrl.pathname;
    revalidatePath(path);
    return NextResponse.json(
      {
        data: dataProfile,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    // Handle specific errors if needed
    if (error.name === "TokenExpiredError") {
      return NextResponse.json(
        {
          message: "Unauthorized - Token expired",
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Unauthorized - Invalid token",
      },
      {
        status: 401,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
