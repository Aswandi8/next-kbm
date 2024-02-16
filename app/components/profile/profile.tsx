"use client";
import { FileUploader } from "./Files";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
const formSchema = z.object({
  imageUrl: z.string(),
});

const MyProfile = ({ dataProfile }: any) => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const createdAt = dataProfile?.data?.createdAt;
  const formattedCreatedAt = createdAt
    ? format(new Date(createdAt), "MMMM dd, yyyy")
    : "N/A";
  const { startUpload } = useUploadThing("imageUploader");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
      id: dataProfile?.data?.id,
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
  return (
    <>
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
    </>
  );
};
export default MyProfile;
