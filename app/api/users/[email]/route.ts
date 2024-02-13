import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import prisma from "@/prisma";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    // await connectToDatabase();
    const emailUser = await prisma.user.findUnique({
      where: {
        email: params.email,
      },
    });
    if (!emailUser) {
      return NextResponse.json(
        {
          message: `User with this ${params.email} does not exist in the Database`,
        },
        {
          status: 404,
        }
      );
    }
    const body: User = await request.json();
    const updateUsers = await prisma.user.update({
      where: {
        email: params.email,
      },
      data: {
        role: body.role,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json(
      {
        message: "Role updated successfully",
        data: updateUsers,
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
