"use client";
import * as React from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/context/ContextProvider";
import MyHeading from "@/app/components/ui/heading";
import { Input } from "@/components/ui/input";
import MyLabel from "@/app/components/ui/label";
import MyButton from "@/app/components/ui/button";
import { FaPencil } from "react-icons/fa6";
import authService from "@/lib/service/authService";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

const UpdateUsers = ({ dataUsers }: any) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { currentColor } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [role, SetRole] = useState("");
  const formSchema = yup.object().shape({
    email: yup.string().required("email is required"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });
  const onSelectRole = (roleSelect: string) => {
    SetRole(roleSelect);
  };
  async function onSubmit(data: any) {
    const newData = {
      ...data,
      role,
      updatedAt: new Date(),
    };
    setLoading(true);
    await authService
      .updateUser(newData)
      .then((response: AxiosResponse) => {
        // Handle response
        toast.success("Role updated successfully");
        setLoading(false);
        reset();
        setOpen(false);
        router.refresh();
      })
      .catch((reason: AxiosError<{ additionalInfo: string }>) => {
        if (reason.response?.status === 400) {
          // Handle 400
          setLoading(false);
          toast.error("Kriteria with this kriteria already exists");
        } else {
          setLoading(false);
          toast.error("Oops Something Went wrong");
        }
      });
  }
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
                <MyLabel title="Email" />
                <Input
                  {...register("email")}
                  id="email"
                  name="email"
                  value={dataUsers.email}
                  type="text"
                  style={{ border: `1px solid ${currentColor}` }}
                  className="col-span-3  border outline-offset-0 dark:placeholder:text-gray-500 dark:text-gray-200 text-slate-800 placeholder:text-slate-300 focus:border focus-visible:ring-0 focus-visible:ring-offset-0 bg-gray-300/50"
                  placeholder="kriteria"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <MyLabel title="Role" />
                <Select onValueChange={(value: string) => onSelectRole(value)}>
                  <SelectTrigger className=" col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Role</SelectLabel>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="logistic">Logistic</SelectItem>
                      <SelectItem value="keuangan">Keuangan</SelectItem>
                      <SelectItem value="teknisi">Teknisi</SelectItem>
                      <SelectItem value="superadmin">Super Admin</SelectItem>
                      <SelectItem value="superuser">Super User</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="flex flex-row items-center justify-end gap-2">
              <MyButton
                text={loading ? " Updating please wait..." : "Update"}
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
