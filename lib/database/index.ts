import prisma from "@/prisma";

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
  } catch (error: any) {
    console.log(error.message);
  }
};
