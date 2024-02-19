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
  const [kostData, setKostData] = useState<any>(null);
  const [kriteriaData, setKriteriaData] = useState<any>([]); // Initialize with an empty array
  const [totalSum, setTotalSum] = useState(0);
  const [loading, setLoading] = useState(true);

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
    console.log("Form data:", data);
    const inputsArray = data.nilai.map(
      (item: any) => parseFloat(item.nilai) || 0
    );
    const newTotalSum = inputsArray.reduce(
      (acc: number, currentValue: number) => acc + currentValue,
      0
    );
    const newData = {
      id: params.id,
      total_nilai: newTotalSum,
    };

    console.log(inputsArray);
    console.log(newData);
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
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="flex w-1/2 flex-wrap gap-4">
                  <div className="w-full">
                    <MyImage
                      src={kostData.imageUrl[kostData.imageUrl.length - 1]}
                      alt="kost"
                      className="block rounded-lg object-cover object-center h-[300px]"
                    />
                  </div>
                  {kostData.imageUrl.map((image: any, index: number) => (
                    <div className="w-1/2" key={index}>
                      <MyImage
                        src={image}
                        alt="kost"
                        className="block h-[100px] rounded-lg object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <h1>apa</h1>
                </div>
              </div>
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
                              <FormItem>
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
                  <MyButton
                    text={loading ? "Creating please wait..." : "Add"}
                    type="submit"
                    disabled={loading}
                  />
                </form>
              </Form>
            </MyCard>
          </div>
        </>
      )}
    </>
  );
};

export default PenilaianKostSuperAdmin;
