import prisma from "@/prisma";
import { connectToDatabase } from "../database";
import { GetRelatedEventsByCategoryParams } from "@/types";

type GetAllEventsParams = {
  query: string;
  limit: number;
  page: number;
};
export async function getAllKost({
  query,
  limit = 6,
  page,
}: //   category,
GetAllEventsParams) {
  try {
    await connectToDatabase();
    // Kondisi pencarian berdasarkan query
    const titleCondition = query
      ? { kost: { contains: query.toLowerCase() } }
      : {};
    // Mengambil total count sebelum paginasi
    const totalCount = await prisma.dataKost.count({
      where: titleCondition,
    });
    // Menghitung skipAmount untuk pagination
    const skipAmount = (Number(page) - 1) * limit;
    // Mengambil data dari database menggunakan Prisma
    const data = await prisma.dataKost.findMany({
      where: {
        AND: [titleCondition],
      },
      orderBy: { createdAt: "desc" },
      skip: skipAmount,
      take: limit,
    });
    return {
      data: JSON.parse(JSON.stringify(data)),
      totalPages: Math.ceil(totalCount / limit),
    };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
