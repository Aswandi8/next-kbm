"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/context/ContextProvider";
import MyHeading from "@/app/components/ui/heading";
import { Input } from "@/components/ui/input";
import MyLabel from "@/app/components/ui/label";
import MyButton from "@/app/components/ui/button";
import { FaPencil } from "react-icons/fa6";

const UpdateUsers = ({ dataUsers }: any) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { currentColor } = useStateContext();
  const [loading, setLoading] = useState(false);
  const formSchema = yup.object().shape({
    name: yup.string().required("kriteria is required"),
    bobot: yup
      .number()
      .positive("bobot must be positive")
      .required("bobot is required")
      .min(10, "bobot must be greater than 10")
      .max(100, "bobot must be less than 100"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  async function onSubmit(data: any) {}
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <FaPencil style={{ color: currentColor }} />
        </DialogTrigger>
        <DialogContent
          className="w-full"
          style={{ border: `1px solid ${currentColor}` }}
        >
          <DialogHeader>
            <DialogTitle>
              <MyHeading title={`Update user ${dataUsers.username}`} />
            </DialogTitle>
          </DialogHeader>
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <MyLabel title="Kriteria" />
                <Input
                  {...register("name")}
                  id="name"
                  name="name"
                  type="text"
                  style={{ border: `1px solid ${currentColor}` }}
                  className="col-span-3  border outline-offset-0 dark:placeholder:text-gray-500 dark:text-gray-200 text-slate-800 placeholder:text-slate-300 focus:border focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                  placeholder="kriteria"
                  readOnly
                />
              </div>
              {errors.name?.message && (
                <div className="flex justify-end">
                  <small className="text-red-600 text-sm  -mt-3">
                    {errors.name?.message}
                  </small>
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <MyLabel title="Bobot" />
                <Input
                  {...register("bobot")}
                  id="bobot"
                  name="bobot"
                  type="text"
                  style={{ border: `1px solid ${currentColor}` }}
                  className="col-span-3  border outline-offset-0 dark:placeholder:text-gray-500 dark:text-gray-200 text-slate-800 placeholder:text-slate-300 focus:border focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                  placeholder="bobot"
                />
              </div>
              {errors.bobot?.message && (
                <div className="flex justify-end">
                  <small className="text-red-600 text-sm  -mt-3">
                    {errors.bobot?.message}
                  </small>
                </div>
              )}
            </div>
            <DialogFooter className="flex flex-row items-center justify-end gap-2">
              <MyButton
                text={loading ? " Creating please wait..." : "Add"}
                type="submit"
              />
            </DialogFooter>
          </form>
          {/* End of form */}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default UpdateUsers;
