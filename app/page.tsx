"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
export default function Home() {
  useEffect(() => {
    redirect("/auth/sign-in");
  });
  return (
    <div className="flex h-screen items-center justify-center bg-gray-500">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
}
