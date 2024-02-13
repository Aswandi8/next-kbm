import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import bcrypt from "bcryptjs";
import prisma from "@/prisma";

export async function POST(request: NextRequest) {
  try {
    const { username, email, password, role } = await request.json();
    const newRole = "member";
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectToDatabase();
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          message: `User with this email (${email}) already exists in the Database`,
        },
        {
          status: 400,
        }
      );
    }
    const users = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: newRole,
      },
    });
    return NextResponse.json(
      {
        message: "User created successfully",
        data: users,
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
