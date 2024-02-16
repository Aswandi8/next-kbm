"use client";
import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import MySeparator from "@/app/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import MyParagraph from "@/app/components/ui/paragraph";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MyButton from "@/app/components/ui/button";
import { FileUploader } from "@/app/components/ui/FileUploader";
import toast from "react-hot-toast";
import { useUploadThing } from "@/lib/uploadthing/uploadthing";
import kostService from "@/lib/service/kostService";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  kost: z.string(),
  category: z.string(),
  room: z.string(),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "Location must be less than 400 characters"),
  price: z.string(),
  url: z.string(),
  imageUrl: z.string(),
});
const AddKost = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kost: "",
      category: "",
      room: "",
      description: "",
      location: "",
      price: "",
      url: "",
    },
  });
  const { startUpload } = useUploadThing("imageUploader");
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const uploadedImageUrl: string[] = [];
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        setLoading(false);
        return;
      }
      uploadedImages.forEach((image) => {
        uploadedImageUrl.push(image.url);
      });
    } else {
      toast.error("Max upload 1 image");
      setLoading(false);
      return;
    }
    const newData = {
      ...values,
      imageUrl: uploadedImageUrl,
    };
    await kostService
      .addKost(newData)
      .then((response: AxiosResponse) => {
        // Handle response
        toast.success("Data kost created successfully", response.data.message);
        setLoading(false);
        form.reset();
        router.replace("/superadmin/kost");
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
  const countImage = files.length;
  return (
    <>
      <div className="flex flex-col gap-4">
        <ComponentSeparator
          title="Add Data Kost"
          nav1="Dashboard"
          link1="/superadmin/home"
          nav2="Data Kost"
          link2="/superadmin/kost"
          active="Add Data Kost"
        />

        <MyCard>
          <MyHeading title="Add Data Kost" />
          <MySeparator label="horizontal" />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 mt-4"
            >
              <FormField
                control={form.control}
                name="kost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <MyParagraph>Category</MyParagraph>
                      <FormControl>
                        <Input placeholder="Category" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="room"
                  render={({ field }) => (
                    <FormItem>
                      <MyParagraph>Room</MyParagraph>
                      <FormControl>
                        <Input type="number" placeholder="Room" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <MyParagraph>Url</MyParagraph>
                      <FormControl>
                        <Input placeholder="Url" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <MyParagraph>Price</MyParagraph>
                      <FormControl>
                        <Input type="number" placeholder="Price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <MyParagraph>Location</MyParagraph>
                    <FormControl>
                      <Textarea placeholder="Location kost" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <MyParagraph>Description</MyParagraph>
                    <FormControl>
                      <Textarea placeholder="Description kost" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        countImage={countImage}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div>
                <MyButton
                  text={loading ? "Loading..." : "Add Data"}
                  type="submit"
                  disabled={loading ? true : false}
                />
              </div>
            </form>
          </Form>
        </MyCard>
      </div>
    </>
  );
};
export default AddKost;
