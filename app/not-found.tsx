"use client";
import { useRouter } from "next/navigation";
// import MyButton from "./components/ui/MyButton";
import Image from "next/image";
import MyImage from "./components/ui/image";
import MyButton from "./components/ui/button";

export default function NotFound() {
  const router = useRouter();
  const handleClick = (e: any) => {
    e.preventDefault();
    router.push("/");
  };
  return (
    <>
      <div className="h-screen w-screen bg-gray-200 dark:bg-slate-700 flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-slate-700 dark:text-gray-200">
          <div className="w-full lg:w-1/2 mx-8">
            <div className="text-7xl text-[#A5D721] font-dark font-extrabold mb-8">
              Not Found
            </div>
            <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
              Could not find requested resource
            </p>
            <MyButton
              text="back to homepage"
              customFunc={() => router.push("/admin/home")}
            />
          </div>
          <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
            <MyImage alt="Not Found" src="/assets/images/error-2.svg" />
          </div>
        </div>
      </div>
    </>
  );
}
