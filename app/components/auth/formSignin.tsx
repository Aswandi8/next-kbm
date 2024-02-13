"use client";
import { useStateContext } from "@/context/ContextProvider";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MyButton from "../ui/button";
import { signIn } from "next-auth/react";
const FormSignIn = () => {
  const { currentColor } = useStateContext();
  const router = useRouter();
  const callbackUrl = "/admin/home";
  const [loading, setLoading] = useState(false);
  const [errorSignIn, setErrorSignIn] = useState("");

  const formSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
  });

  async function onSubmit(data: any) {
    try {
      setLoading(true);
      const loginData = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (loginData?.status === 200) {
        setLoading(false);
        toast.success("Login Successful");
        reset();
        router.push(callbackUrl);
      } else {
        setLoading(false);
        setErrorSignIn("User Not Found");
        toast.error("User Not Found");
      }
    } catch (error) {
      setLoading(false);
      setErrorSignIn("Its seems something is wrong with your Network");
      toast.error("Its seems something is wrong with your Network");
    }
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  return (
    <>
      <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="title" style={{ color: currentColor }}>
          Sign in
        </h2>
        {errorSignIn && (
          <div
            className="p-2 mb-2 text-sm rounded-lg bg-red-50 text-red-600"
            role="alert"
          >
            {errorSignIn}
          </div>
        )}
        <div className="input-field">
          <div className="inputIcon">
            <MdOutlineEmail />
          </div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            type="email"
            placeholder="Email"
            className="inputLogin"
            id="email"
            name="email"
          />
        </div>
        {errors.email?.message && (
          <small className="text-red-600 text-sm ">
            {errors.email?.message}
          </small>
        )}
        <div className="input-field">
          <div className="inputIcon">
            <MdLockOutline />
          </div>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="inputLogin"
            id="password"
            name="password"
          />
        </div>
        {errors.password?.message && (
          <small className="text-red-600 text-sm ">
            {errors.password?.message}
          </small>
        )}
        <div className="my-3">
          <MyButton
            type="submit"
            text={loading ? "please wait..." : "Sign In"}
          />
        </div>
      </form>
    </>
  );
};
export default FormSignIn;
