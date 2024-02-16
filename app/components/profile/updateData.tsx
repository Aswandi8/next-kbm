"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import MyButton from "../ui/button";
import { useState } from "react";
import MyParagraph from "../ui/paragraph";
import { useSession } from "next-auth/react";

const UpdateData = ({ dataProfile }: any) => {
  console.log(dataProfile);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [contoh, setContoh] = useState("");
  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required("username is required")
      .min(4, "username must be at least 3 characters"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });
  async function onSubmit(data: any) {
    setContoh(data);
    console.log(data);
  }

  return (
    <div className="my-4">
      {contoh}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div className="div">
            <MyParagraph>Username</MyParagraph>
            <Input
              {...register("username")}
              id="username"
              name="username"
              type="text"
              defaultValue={dataProfile.username}
            />
            {errors.username?.message && (
              <MyParagraph>
                <small className="text-red-600/70">
                  {errors.username?.message}
                </small>
              </MyParagraph>
            )}
          </div>
          {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <MyParagraph>Username</MyParagraph>
              <Input
                id="email"
                name="email"
                type="text"
                defaultValue=""
                readOnly
              />
            </div>
            <div>
              <MyParagraph>Role</MyParagraph>
              <Input
                id="role"
                name="role"
                type="text"
                defaultValue=""
                readOnly
              />
            </div>
          </div> */}
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
