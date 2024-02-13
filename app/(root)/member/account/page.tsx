"use client";
import MyImage from "@/app/components/ui/image";
import { useStateContext } from "@/context/ContextProvider";
import { useSession } from "next-auth/react";

const AccountMember = () => {
  const { currentColorText } = useStateContext();
  const session = useSession();
  return (
    <section className="container min-h-screen flex py-10 md:flex-row flex-col items-center">
      <div className="flex-1 flex items-center justify-center h-full ">
        <MyImage
          alt="hero"
          src={
            session.data?.user?.photo
              ? session.data?.user?.photo
              : "/assets/images/hero.png"
          }
          className="h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="md:text-left text-center">
          <h1 className="md:text-5xl text-2xl md:leading-normal leading-10 text-white font-bold capitalize">
            <span
              className="md:text-6xl text-5xl "
              style={{ color: currentColorText }}
            >
              hello!
              <br />
            </span>
            {session.data?.user?.username}
          </h1>
          <h4 className="text-xl leading-normal mt-4 text-gray-600">
            Mohon ditunggu, sampai admin mengaktifkan akunmu
          </h4>
        </div>
      </div>
    </section>
  );
};
export default AccountMember;
