"use client";
import Loading from "@/app/(home)/loading";
import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import MySeparator from "@/app/components/ui/separator";
import kostService from "@/lib/service/kostService";
import kriteriaService from "@/lib/service/kriteriaService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MyParagraph from "@/app/components/ui/paragraph";
import MyButton from "@/app/components/ui/button";

const PenilaianKostSuperAdmin = ({ params }: { params: { id: string } }) => {
  const [kostData, setKostData] = useState<any>(null);
  const [kriteriaData, setKriteriaData] = useState<any>(null);
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

  const defaultValues = Object.fromEntries(
    (kriteriaData || []).map((_: any, index: number) => ({
      [`kriteriaId[${index}]`]: "0",
    }))
  );

  const form = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = async (values: any) => {
    console.log("Form values:", values);
    // Lakukan perhitungan metode moora atau kirim data ke database di sini
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

              <Form {...form}>
                <form action="" onSubmit={form.handleSubmit(onSubmit)}>
                  {kriteriaData.map((kriteria: any, index: number) => (
                    <div key={kriteria.id}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <MyParagraph>{kriteria.kriteria}</MyParagraph>
                          <FormField
                            control={form.control}
                            name={`kriteriaId[${index}]`}
                            render={({ field }) => (
                              <FormItem className="col-span-3" key={field.name}>
                                <FormControl>
                                  <Select
                                    onValueChange={(value) =>
                                      form.setValue(
                                        `kriteriaId[${index}]`,
                                        value
                                      )
                                    }
                                  >
                                    <SelectTrigger className="">
                                      <SelectValue placeholder="Select subkriteria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Sub kriteria</SelectLabel>
                                        {kriteria.subkriterias.map(
                                          (subkriteria: any) => (
                                            <SelectItem
                                              key={subkriteria.id}
                                              value={subkriteria.bobot}
                                            >
                                              {subkriteria.subkriteria}
                                            </SelectItem>
                                          )
                                        )}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
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
                    text={loading ? " Creating please wait..." : "Add"}
                    type="submit"
                    disabled={loading ? true : false}
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
