"use client";
import React from "react";
import { useRouter } from "next/navigation";
import MyImage from "@/app/components/ui/image";
import MyButton from "@/app/components/ui/button";
import FormSignUp from "@/app/components/auth/formSignup";
const SignUpPage = () => {
  const router = useRouter();
  return (
    <div className="myContainer sign-up-mode w-full h-screen flex items-start dark:bg-slate-900">
      <div className="forms-container">
        <div className="signin-signup-up">
          <FormSignUp />
        </div>
      </div>
      <div className="panels-container">
        <div className="panel right-panel ">
          <div className="content">
            <h3>New here ?</h3>
            <p className="mb-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <MyButton
              text="Sign In"
              customFunc={() => router.push("/auth/sign-in")}
            />
          </div>
          <MyImage
            alt="sign-up"
            src="/assets/images/sign-up.svg"
            className="image md:mt-5"
          />
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
