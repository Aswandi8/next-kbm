"use client";
import React from "react";
import { useRouter } from "next/navigation";
import MyImage from "@/app/components/ui/image";
import MyButton from "@/app/components/ui/button";
import { useStateContext } from "@/context/ContextProvider";
import { FaGoogle, FaGithub } from "react-icons/fa";
import FormSignIn from "@/app/components/auth/formSignin";
const SignInPage = () => {
  const { currentColor } = useStateContext();
  const router = useRouter();
  return (
    <>
      <div className="myContainer w-full h-screen flex items-start dark:bg-slate-900">
        <div className="forms-container">
          <div className="signin-signup">
            <FormSignIn />
            <p className="social-text text-center text-slate-800 dark:text-gray-400">
              Or Sign in with social platforms
            </p>
            <div className="social-media hover:text-white">
              <button
                type="button"
                style={{ border: `1px solid ${currentColor}` }}
                className="social-icon hover:shadow-xl"
              >
                <FaGoogle style={{ color: currentColor }} />
              </button>
              <button
                type="button"
                style={{ border: `1px solid ${currentColor}` }}
                className="social-icon hover:shadow-xl"
              >
                <FaGithub style={{ color: currentColor }} />
              </button>
            </div>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Welcome To Const_id</h3>
              <p className="mb-2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <MyButton
                text="Sign Up"
                customFunc={() => router.push("/auth/sign-up")}
              />
            </div>
            <MyImage
              alt="sign-in"
              src="/assets/images/sign-in.svg"
              className="image md:mt-5"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default SignInPage;
