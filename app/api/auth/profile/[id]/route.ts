import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/database";
import prisma from "@/prisma";
import type { User } from "@prisma/client";
import { utapi } from "@/lib/uploadthing/instance";
import { revalidatePath } from "next/cache";
export const dynamic = "force-dynamic";
import bcrypt from "bcryptjs";
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const profileExists = await prisma.user.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!profileExists) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    const body = await request.json();
    console.log(body);

    const oldPassword = profileExists.password;
    const oldImage = profileExists.photo;
    const split3: any = oldImage?.split("/")[4];
    if (oldImage) {
      await utapi.deleteFiles(split3);
    }

    if (body.oldPassword) {
      const isValidPassword = await bcrypt.compare(
        body.oldPassword,
        profileExists.password
      );
      console.log(isValidPassword);
      if (!isValidPassword) {
        return NextResponse.json({
          message: "Invalid Password",
        });
      }
      const newPassword = await bcrypt.hash(body.newPassword, 10);
      console.log(newPassword);
      const profile = await prisma.user.update({
        where: {
          id: params.id,
        },
        data: {
          password: newPassword,
          updatedAt: new Date(),
        },
      });
      return NextResponse.json({
        message: "Password Updated Successfully",
      });
    }
    console.log(profileExists);

    const profile = await prisma.user.update({
      where: {
        id: params.id,
      },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
        role: body.role,
        photo: body.photo,
        updatedAt: new Date(),
      },
    });
    const path = request.nextUrl.pathname;
    revalidatePath(path);
    return NextResponse.json(
      {
        message: "Profile updated Successfully",
        data: profile,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
