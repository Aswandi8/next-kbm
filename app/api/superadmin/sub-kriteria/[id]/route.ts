import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/database";
export const dynamic = "force-dynamic";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    connectToDatabase();
    const token = request.headers.get("Authorization") || "";
    if (token) {
      var decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
      if (decoded) {
        const subkriteriaExisting = await prisma.subKriteria.findUnique({
          where: {
            id: params.id,
          },
        });
        if (!subkriteriaExisting) {
          return NextResponse.json(
            {
              message: "Data subkriteria does not exist in the Database",
            },
            {
              status: 404,
            }
          );
        }
        const deleteSubkriteria = await prisma.subKriteria.delete({
          where: {
            id: params.id,
          },
        });
        const path = request.nextUrl.pathname;
        revalidatePath(path);
        return NextResponse.json({
          success: true,
          data: deleteSubkriteria,
        });
      } else {
        return NextResponse.json({
          success: false,
          data: "Unauthorized token",
        });
      }
    } else {
      return NextResponse.json({
        message: "Unauthorized token",
      });
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
