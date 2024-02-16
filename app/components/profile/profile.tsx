"use client";
import { FileUploader } from "./Files";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { useUploadThing } from "@/lib/uploadthing/uploadthing";
import { useState } from "react";
import MyCard from "@/app/components/ui/card";
import MyButton from "@/app/components/ui/button";
import authService from "@/lib/service/authService";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MySpan from "../ui/span";
import { GoKey } from "react-icons/go";
import MyHeading from "../ui/heading";
import MySeparator from "../ui/separator";
import { FaRegUser } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import MyParagraph from "../ui/paragraph";
const formSchema = z.object({
  imageUrl: z.string(),
});
const formSchemaProfile = z.object({
  username: z.string(),
});

const MyProfile = ({ dataProfile }: any) => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const createdAt = dataProfile?.createdAt;
  const formattedCreatedAt = createdAt
    ? format(new Date(createdAt), "MMMM dd, yyyy")
    : "N/A";
  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const formProfile = useForm<z.infer<typeof formSchemaProfile>>({
    resolver: zodResolver(formSchemaProfile),
    defaultValues: {
      username: dataProfile.username || session?.user?.username,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }
      uploadedImageUrl = uploadedImages[0].url;
    }
    const newData = {
      id: dataProfile?.id,
      photo: uploadedImageUrl,
    };
    await update({
      ...session,
      user: {
        photo: uploadedImageUrl,
      },
    });
    await authService
      .updateImageProfile(newData)
      .then((response: AxiosResponse) => {
        // Handle response
        toast.success("Profile Update Successfully");
        setLoading(false);
        router.refresh();
        form.reset();
      })
      .catch((reason: AxiosError<{ additionalInfo: string }>) => {
        if (reason.response?.status === 404) {
          // Handle 400
          setLoading(false);
          toast.error("Profile does not exist in the Database");
        } else {
          setLoading(false);
          toast.error("Oops Something Went wrong");
        }
      });
  }

  async function onSubmitProfile(value: z.infer<typeof formSchemaProfile>) {
    setLoadingData(true);
    const newData = {
      id: dataProfile.id,
      username: value.username,
    };
    await update({
      ...session,
      user: {
        username: value.username,
      },
    });
    await authService
      .updateImageProfile(newData)
      .then((response: AxiosResponse) => {
        // Handle response
        toast.success("Profile Update Successfully");
        setLoadingData(false);
        router.refresh();
        form.reset();
      })
      .catch((reason: AxiosError<{ additionalInfo: string }>) => {
        if (reason.response?.status === 404) {
          // Handle 400
          setLoadingData(false);
          toast.error("Profile does not exist in the Database");
        } else {
          setLoadingData(false);
          toast.error("Oops Something Went wrong");
        }
      });
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 lg:gap-4 ">
        <MyCard>
          <div className="flex flex-col justify-center items-center ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUploader
                          onFieldChange={field.onChange}
                          imageUrl={field.value}
                          setFiles={setFiles}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <MyButton
                  text={loading ? "Loading..." : "Update Profile"}
                  type="submit"
                  disabled={loading ? true : false}
                />
              </form>
            </Form>
          </div>
        </MyCard>
        <div className="sm:col-span-3">
          <MyCard>
            <MySpan className="flex items-center gap-2">
              <FaRegUser />
              <MyHeading title="Update Data" />
            </MySpan>
            <MySeparator label="horizontal" />
            <Form {...formProfile}>
              <form
                onSubmit={formProfile.handleSubmit(onSubmitProfile)}
                className="flex flex-col gap-5 mt-4"
              >
                <FormField
                  control={formProfile.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <MyParagraph>Username</MyParagraph>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <MyParagraph>Email</MyParagraph>
                    <Input placeholder={dataProfile.email} readOnly />
                  </div>
                  <div>
                    <MyParagraph>Role</MyParagraph>
                    <Input placeholder={dataProfile.role} readOnly />
                  </div>
                </div>

                <div>
                  <MyButton
                    text={loadingData ? "Loading..." : "Update Profile"}
                    type="submit"
                    disabled={loadingData ? true : false}
                  />
                </div>
              </form>
            </Form>
          </MyCard>
        </div>
      </div>
      <div>
        <MyCard>
          <MySpan className="flex items-center gap-2">
            <GoKey />
            <MyHeading title="Change Password" />
          </MySpan>
          <MySeparator label="horizontal" />
          {/* <UpdatePassword dataProfile={profile} /> */}
        </MyCard>
      </div>
    </>
  );
};
export default MyProfile;
