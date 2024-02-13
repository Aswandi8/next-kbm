"use client";
import { useStateContext } from "@/context/ContextProvider";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import MyButton from "../ui/button";
import toast from "react-hot-toast";
import authService from "@/lib/service/authService";
import { AxiosError, AxiosResponse } from "axios";
const FormSignUp = () => {
  const { currentColor } = useStateContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorSignUp, setErrorSignUp] = useState("");

  const formSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([yup.ref("password")], "Passwords do not match"),
    role: yup.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  async function onSubmit(data: any) {
    setLoading(true);
    await authService
      .signupService(data)
      .then((response: AxiosResponse) => {
        setLoading(false);
        reset();
        toast.success("User created successfully");
        router.push("/auth/sign-in");
      })
      .catch((reason: AxiosError<{ additionalInfo: string }>) => {
        if (reason.response?.status === 400) {
          setLoading(false);
          setErrorSignUp("User with this email already exists in the Database");
          toast.error("User with this email already exists in the Database");
        } else {
          setLoading(false);
          setErrorSignUp("Oops Something Went wrong, Internal Server Error");
          toast.error("Oops Something Went wrong, Internal Server Error");
        }
      });
  }
  return (
    <>
      <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="title" style={{ color: currentColor }}>
          Sign Up
        </h2>
        {errorSignUp && (
          <div
            className="p-2 mb-2 text-sm rounded-lg bg-red-50 text-red-600"
            role="alert"
          >
            {errorSignUp}
          </div>
        )}
        {errors.username?.message && (
          <small className="text-red-600 text-sm ">
            {errors.username?.message}
          </small>
        )}
        <div className="input-field">
          <div className="inputIcon">
            <FaRegUser />
          </div>
          <input
            {...register("username")}
            type="text"
            placeholder="Username"
            className="inputLogin"
            name="username"
            id="username"
          />
        </div>
        {errors.email?.message && (
          <small className="text-red-600 text-sm ">
            {errors.email?.message}
          </small>
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
            name="email"
            id="email"
          />
        </div>
        {errors.password?.message && (
          <small className="text-red-600 text-sm ">
            {errors.password?.message}
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
            name="password"
            id="password"
          />
        </div>
        {errors.confirmPassword?.message && (
          <small className="text-red-600 text-sm ">
            {errors.confirmPassword?.message}
          </small>
        )}
        <div className="input-field">
          <div className="inputIcon">
            <MdLockOutline />
          </div>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Repeat Password"
            className="inputLogin"
            name="confirmPassword"
            id="confirmPassword"
          />
        </div>
        <div className="my-3">
          <MyButton
            type="submit"
            text={loading ? "Creating please wait..." : "Sign Up"}
          />
        </div>
      </form>
    </>
  );
};
export default FormSignUp;
