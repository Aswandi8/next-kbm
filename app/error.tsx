"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MyImage from "./components/ui/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  const router = useRouter();

  return (
    <>
      <div className="h-screen w-screen bg-gray-200 dark:bg-slate-700 flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-slate-700 dark:text-gray-200">
          <div className="w-full lg:w-1/2 mx-8">
            <div className="text-7xl text-[#A5D721] font-dark font-extrabold mb-8">
              404
            </div>
            <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
              Sorry we couldnt find the page youre looking for
            </p>
            {/* <MyButton
              text="back to homepage"
              customFunc={() => router.push("/admin/home")}
            /> */}
          </div>
          <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
            <MyImage alt="404" src="/assets/images/error-4.svg" />
          </div>
        </div>
      </div>
    </>
  );
}
