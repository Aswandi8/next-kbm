"use client";
import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useStateContext } from "@/context/ContextProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MyButton from "@/app/components/ui/button";
import MyParagraph from "@/app/components/ui/paragraph";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import sparepartService from "@/lib/service/sparepartService";
import { AxiosError, AxiosResponse } from "axios";
import { FileUploader } from "@/app/components/ui/FileUploader";
import { useUploadThing } from "@/lib/uploadthing/uploadthing";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  sparepart: z.string().min(3, "Sparepart must be at least 3 characters"),
  produksi: z.string().min(3, "Produksi must be at least 3 characters"),
  merek: z.string().min(3, "Merk must be at least 3 characters"),
  stock: z.coerce.number().min(1, "Bobot must be at least 10").max(100),
  spesifikasi: z.string().min(3, "Spesifikasi must be at least 3 characters"),
  imageUrl: z.string(),
});

const AddSparepart = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { currentColor } = useStateContext();
  const session: any = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sparepart: "",
      produksi: "",
      merek: "",
      stock: 0,
      spesifikasi: "",
      imageUrl: "",
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
      toast.error("Max upload 10 image");
      setLoading(false);
      return;
    }
    const newData = {
      ...values,
      imageUrl: uploadedImageUrl,
    };

    await sparepartService
      .addSparepart(newData, session.data?.user.access_token)
      .then((response: AxiosResponse) => {
        setLoading(false);
        toast.success("Data sparepart created successfully");
        form.reset();
        router.replace("/logistic/sparepart");
        router.refresh();
      })
      .catch((reason: AxiosError<{ additionalInfo: string }>) => {
        if (reason.response?.status === 400) {
          setLoading(false);
          toast.error("Data Sparepart already exists");
        } else if (reason.response?.status === 401) {
          setLoading(false);
          toast.error("Unauthorized token");
        } else if (reason.response?.status === 404) {
          setLoading(false);
          toast.error("Data sparepart not found");
        } else if (reason.response?.status === 406) {
          setLoading(false);
          toast.error("Not acceptable");
        } else {
          setLoading(false);
          toast.error("Oops Something Went wrong");
        }
      });
  }
  return (
    <>
      <div className="flex flex-col gap-4">
        <ComponentSeparator
          title="Add Data Sparepart"
          subTitle="Sparepart adalah"
          nav1="Dashboard"
          link1="/logistic/home"
          nav2="Data Sparepart"
          link2="/logistic/sparepart"
          active="Add Data Sparepart"
        />
        <MyCard>
          <MyHeading title="Add Data Sparepart" className="mb-3" />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="sparepart"
                render={({ field }) => (
                  <FormItem>
                    <MyParagraph>Sparepart</MyParagraph>
                    <FormControl>
                      <Input type="text" placeholder="Sparepart" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="produksi"
                  render={({ field }) => (
                    <FormItem>
                      <MyParagraph>Produksi</MyParagraph>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl
                          style={{ border: `1px solid ${currentColor}` }}
                        >
                          <SelectTrigger className="bg-background/50">
                            <SelectValue placeholder="Select a produksi to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent
                          style={{ border: `1px solid ${currentColor}` }}
                        >
                          <SelectItem
                            value="Local"
                            className="select-item p-regular-14"
                          >
                            Local
                          </SelectItem>
                          <SelectItem
                            value="China"
                            className="select-item p-regular-14"
                          >
                            China
                          </SelectItem>
                          <SelectItem
                            value="Workshop"
                            className="select-item p-regular-14"
                          >
                            Workshop
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="merek"
                  render={({ field }) => (
                    <FormItem>
                      <MyParagraph>Merek</MyParagraph>
                      <FormControl>
                        <Input type="text" placeholder="Merek" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <MyParagraph>Stock</MyParagraph>
                      <FormControl>
                        <Input type="number" placeholder="Stock" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="spesifikasi"
                render={({ field }) => (
                  <FormItem>
                    <MyParagraph>Sparepart</MyParagraph>
                    <FormControl>
                      <Textarea placeholder="Spesifikasi" {...field} />
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
                    <MyParagraph>Image</MyParagraph>
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
export default AddSparepart;
