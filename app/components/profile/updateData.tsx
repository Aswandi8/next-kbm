"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import MyButton from "../ui/button";
import { useState } from "react";
import MyParagraph from "../ui/paragraph";
import { useSession } from "next-auth/react";

const UpdateData = ({ dataProfile }: { dataProfile: any }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required("username is required")
      .min(4, "username must be at least 3 characters"),
    email: yup.string(),
    role: yup.string(),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });
  async function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <div className="my-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="div">
            <MyParagraph>Username</MyParagraph>
            <Input
              {...register("username")}
              id="name"
              name="name"
              type="text"
              defaultValue={dataProfile.data.username}
            />
            {errors.username?.message && (
              <MyParagraph>
                <small className="text-red-600/70">
                  {errors.username?.message}
                </small>
              </MyParagraph>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <MyParagraph>Username</MyParagraph>
              <Input
                {...register("email")}
                id="email"
                name="email"
                type="text"
                defaultValue={dataProfile.data?.email}
                readOnly
              />
            </div>
            <div>
              <MyParagraph>Role</MyParagraph>
              <Input
                {...register("role")}
                id="role"
                name="role"
                type="text"
                defaultValue={dataProfile.data?.role}
                readOnly
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-4 gap-4">
            <MyButton
              text={loading ? "Loading..." : "Update Data"}
              type="submit"
              disabled={loading ? true : false}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default UpdateData;
