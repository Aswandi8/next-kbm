import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/database";
import { utapi } from "@/lib/uploadthing/instance";
export const dynamic = "force-dynamic";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get("Authorization") || "";
    if (token) {
      var decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
      if (decoded) {
        await connectToDatabase();
        const kostId = await prisma.dataKost.findUnique({
          where: {
            id: params.id,
          },
        });
        if (!kostId) {
          return NextResponse.json(
            {
              message: "Data kost does not exist in the Database",
            },
            {
              status: 404,
            }
          );
        }
        const oldImage = kostId.imageUrl;
        const deleteImageUrl: string[] = [];
        oldImage.forEach((image) => {
          const keyImage = image.split("/")[4];
          deleteImageUrl.push(keyImage);
        });
        await utapi.deleteFiles(deleteImageUrl);
        const deleteKost = await prisma.dataKost.delete({
          where: {
            id: params.id,
          },
        });
        const path = request.nextUrl.pathname;
        revalidatePath(path);
        return NextResponse.json({
          success: true,
          data: deleteKost,
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const kostId = await prisma.dataKost.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!kostId) {
      return NextResponse.json(
        {
          message: `Data kost with this ${params.id} does not exist in the Database`,
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Success",
        data: kostId,
      },
      {
        status: 201,
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
