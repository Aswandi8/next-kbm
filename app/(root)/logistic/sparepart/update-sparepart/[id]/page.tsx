"use client";

import MyLoading from "@/app/components/ui/myloading";
import sparepartService from "@/lib/service/sparepartService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import { updateSparepartParams } from "@/types";
import MyButton from "@/app/components/ui/button";
import MyCard from "@/app/components/ui/card";
import MyHeading from "@/app/components/ui/heading";
import MyParagraph from "@/app/components/ui/paragraph";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "@/app/components/ui/FileUploader";
import { useStateContext } from "@/context/ContextProvider";
import MyImage from "@/app/components/ui/image";
import { BsTrash } from "react-icons/bs";
const formSchema = z.object({
  sparepart: z.string().min(3, "Sparepart must be at least 3 characters"),
  produksi: z.string().min(3, "Produksi must be at least 3 characters"),
  merek: z.string().min(3, "Merk must be at least 3 characters"),
  stock: z.coerce.number().min(1, "Bobot must be at least 10").max(100),
  spesifikasi: z.string().min(3, "Spesifikasi must be at least 3 characters"),
  imageUrl: z.string(),
});
const UpdateSparepart = ({ params }: { params: any }) => {
  const [sparepartData, setSparepartData] =
    useState<updateSparepartParams | null>(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const { currentColor } = useStateContext();
  useEffect(() => {
    if (params.id) {
      fetchData(params.id);
    }
  }, [params]);

  const fetchData = async (id: string) => {
    try {
      const fetchedSparepartData = await sparepartService.getByIdSparepart(
        params.id
      );
      const { Data: responseData } = fetchedSparepartData.data;
      setSparepartData(responseData);
    } catch (error) {
      console.error("Error fetching data by ID:", error);
    } finally {
      setLoading(false);
    }
  };
  const initialImages = Array.isArray(sparepartData?.imageUrl)
    ? sparepartData.imageUrl.flat()
    : [];
  //   const [images, setImages] = useState(initialImages);
  const [images, setImages] = useState<string[]>(initialImages);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const removeFile = (url: string) => {
    const updatedImages = images.filter((image) => image !== url);

    setImages(updatedImages);
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {}

  return (
    <>
      {loading ? (
        <>
          <div className="flex flex-col gap-4">
            <MyLoading />
          </div>
        </>
      ) : (
        <>
          {sparepartData && (
            <>
              <div className="flex flex-col gap-4">
                <ComponentSeparator
                  title="Update Data Sparepart"
                  subTitle="Sparepart adalah"
                  nav1="Dashboard"
                  link1="/logistic/home"
                  nav2="Data Sparepart"
                  link2="/logistic/sparepart"
                  active={sparepartData?.sparepart || ""}
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
                              <Input
                                type="text"
                                defaultValue={sparepartData.sparepart}
                                {...field}
                              />
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
                                defaultValue={sparepartData.produksi}
                              >
                                <FormControl
                                  style={{
                                    border: `1px solid ${currentColor}`,
                                  }}
                                >
                                  <SelectTrigger className="bg-background/50">
                                    <SelectValue
                                      placeholder={sparepartData.produksi}
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent
                                  style={{
                                    border: `1px solid ${currentColor}`,
                                  }}
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
                                <Input
                                  type="text"
                                  defaultValue={sparepartData.merek}
                                  {...field}
                                />
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
                                <Input
                                  type="number"
                                  defaultValue={sparepartData.stock}
                                  {...field}
                                />
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
                              <Textarea
                                defaultValue={sparepartData.spesifikasi}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex flex-wrap items-end justify-center gap-3">
                        {Array.isArray(sparepartData.imageUrl) ? (
                          sparepartData.imageUrl.map(
                            (url: string, index: number) => (
                              <div key={index} className="relative h-16 w-16">
                                <MyImage
                                  src={url}
                                  alt={`hero-${index}`}
                                  className="h-full w-full object-cover object-center"
                                />
                                <BsTrash
                                  className="absolute right-0 top-0 h-3 w-3 ring rounded-full bg-red-500 ring-red-500 text-white cursor-pointer"
                                  onClick={() => removeFile(url)}
                                />
                              </div>
                            )
                          )
                        ) : (
                          <div className="relative">
                            <MyImage src={sparepartData.imageUrl} alt="hero" />
                            <BsTrash className="absolute right-0 top-0 h-3 w-3 ring rounded-full bg-red-500 ring-red-500 text-white cursor-pointer" />
                          </div>
                        )}
                      </div>
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
          )}
        </>
      )}
    </>
  );
};
export default UpdateSparepart;
