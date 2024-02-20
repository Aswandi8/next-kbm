"use client";
import Loading from "@/app/(home)/loading";
import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import MySeparator from "@/app/components/ui/separator";
import kostService from "@/lib/service/kostService";
import kriteriaService from "@/lib/service/kriteriaService";
import { useEffect, useState } from "react";
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
import MyParagraph from "@/app/components/ui/paragraph";
import MyButton from "@/app/components/ui/button";
import { Input } from "@/components/ui/input";
import MyImage from "@/app/components/ui/image";
import penilaianService from "@/lib/service/penilaianService";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  nilai: z
    .array(
      z.object({
        nilai: z.coerce
          .number() // Change this to number
          .min(1, "Nilai must be at least 1 ")
          .max(5, "Nilai must be at most 5"),
      })
    )
    .refine((data) => data.length > 0, {
      message: "At least one nilai is required",
    }),
});

const PenilaianKostSuperAdmin = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [kostData, setKostData] = useState<any>(null);
  const [kriteriaData, setKriteriaData] = useState<any>([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const fetchedKostData = await kostService.getKostById(params.id);
        const fetchedKriteriaData = await kriteriaService.getAllKriteria();
        setKostData(fetchedKostData.data.data);
        setKriteriaData(fetchedKriteriaData.data.Data);
      } catch (error) {
        console.error("Error fetching data by ID:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataById();
    return () => {
      // Cleanup logic if needed
    };
  }, [params.id]);
  const handleImageClick = (index: any) => {
    // Update the selected image index
    setSelectedImageIndex(index);
  };
  const defaultValues = kriteriaData
    ? {
        nilai: kriteriaData.map(() => ({ nilai: 0 })), // Use 0 or any other default number
      }
    : {};

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  const onSubmit = async (data: any) => {
    // Handle form submission, e.g., send data to server
    const inputsArray = data.nilai.map(
      (item: any) => parseFloat(item.nilai) || 0
    );
    const newTotalSum = inputsArray.reduce(
      (acc: number, currentValue: number) => acc + currentValue,
      0
    );
    const transformedArray = data.nilai.map((item: any) => item.nilai);
    const newData = {
      kostId: params.id,
      nilai: transformedArray,
      sumNilai: newTotalSum,
    };
    await penilaianService
      .addPenilaian(newData)
      .then((response: AxiosResponse) => {
        // Handle response
        toast.success(
          "Penilaian kost created successfully",
          response.data.message
        );
        setLoading(false);
        form.reset();
        router.replace("/superadmin/moora/penilaian-kost");
        router.refresh();
      })
      .catch((reason: AxiosError<{ additionalInfo: string }>) => {
        if (reason.response?.status === 400) {
          // Handle 400
          setLoading(false);
          toast.error(
            "Kost sudah dilakukan penilaian bulan ini, harap melakukan penilaian bulan berikutnya"
          );
        } else {
          setLoading(false);
          toast.error("Oops Something Went wrong");
        }
      });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex gap-4 flex-col">
            <ComponentSeparator
              title="Penilaian Kost"
              nav1="Dashboard"
              link1="/superadmin/home"
              nav2="Penilaian Kost"
              link2={`/superadmin/moora/penilaian-kost`}
              active={kostData.kost}
            />
            <MyCard>
              <div className="flex justify-between">
                <MyHeading title={`Penilaian ${kostData.kost}`} />
              </div>
              <MySeparator label="horizontal" />
              <div className="flex gap-6 mt-6 flex-col md:flex-row">
                <div className="flex flex-col gap-4 w-full  items-center">
                  <MyImage
                    src={kostData.imageUrl[selectedImageIndex]}
                    // src={kostData.imageUrl[kostData.imageUrl.length - 1]}
                    alt="kost"
                    className="block rounded-lg object-cover object-center h-[300px] w-full sm:w-auto"
                  />
                  <div className="flex flex-row w-full gap-4  justify-center">
                    {kostData.imageUrl.map((image: any, index: number) => (
                      <div className="" key={index}>
                        <MyImage
                          src={image}
                          alt="Product"
                          className="block w-[100px] h-auto rounded-lg object-cover object-center cursor-pointer"
                          onClick={() => handleImageClick(index)} // Handle click event
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      {kriteriaData.map((kriteria: any, index: number) => (
                        <div key={kriteria.id}>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <MyParagraph className="capitalize">
                                {kriteria.kriteria}
                              </MyParagraph>
                              <FormField
                                control={form.control}
                                name={`nilai.${index}.nilai`}
                                render={({ field }) => (
                                  <FormItem className="col-span-3">
                                    <FormControl>
                                      <Input
                                        type="text"
                                        placeholder="Nilai"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          {/* MyButton component */}
                          <MyButton
                            text={loading ? "Creating please wait..." : "Add"} // Button text depends on the 'loading' state
                            type="submit" // Button type is set to 'submit'
                            disabled={loading} // Button is disabled when 'loading' is true
                            className="col-start-2 grid-column-end" // Additional classes for styling (tailwind CSS)
                          />
                        </div>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </MyCard>
          </div>
        </>
      )}
    </>
  );
};

export default PenilaianKostSuperAdmin;
