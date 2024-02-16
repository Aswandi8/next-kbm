import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization") || "";
    if (token) {
      var decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
      if (decoded) {
        const profile = await prisma.user.findUnique({
          where: {
            id: decoded.id,
          },
        });
        const path = request.nextUrl.pathname;
        revalidatePath(path);
        console.log(profile);
        const newProfile = JSON.parse(JSON.stringify(profile));
        return NextResponse.json({
          success: true,
          data: profile,
        });
      } else {
        return NextResponse.json({
          success: false,
          data: "goblok",
        });
      }
    } else {
      return NextResponse.json({
        message: "Unauthorized Tena tokennu",
      });
    }
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
