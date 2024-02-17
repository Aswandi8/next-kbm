"use client";
import MyButton from "@/app/components/ui/button";
import MyHeading from "@/app/components/ui/heading";
import MySpan from "@/app/components/ui/span";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStateContext } from "@/context/ContextProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import kriteriaService from "@/lib/service/kriteriaService";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import MyParagraph from "@/app/components/ui/paragraph";
import subkriteriaService from "@/lib/service/subkriteriaService";

const formSchema = z.object({
  kriteriaId: z.string().min(3, "Kriteria must be at least 3 characters"),
  subkriteria: z.string().min(3, "Kriteria must be at least 3 characters"),
  bobot: z.coerce
    .number()
    .min(1, "Bobot must be at least 1-5")
    .max(5, "Bobot must be at least 1-5"),
});
const AddSubkriteria = ({ dataKriteria }: { dataKriteria: any }) => {
  const router = useRouter();
  const { currentColor } = useStateContext();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kriteriaId: "",
      subkriteria: "",
      bobot: 0,
    },
  });
  const onSelectCategory = (kriteriaSelect: string) => {
    // setKriterias(kriteriaSelect);
    console.log(kriteriaSelect);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    console.log(values);
    await subkriteriaService
      .addKriteria(values)
      .then((response: AxiosResponse) => {
        // Handle response
        toast.success("Kriteria Created Successfully", response.data.message);
        setLoading(false);
        form.reset();
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
          <MySpan className="flex flex-row items-center gap-2">
            <FaPlus />
            Add data
          </MySpan>
        </DialogTrigger>
        <DialogContent
          className="w-full"
          style={{ border: `1px solid ${currentColor}` }}
        >
          <DialogHeader>
            <DialogTitle>
              <MyHeading title="Add Subkriteria" />
            </DialogTitle>
            <DialogDescription className="text-sm font-normal tracking-wide text-gray-400">
              Subriteria ini akan digunakan dalam penilaian kost yang
              berdasarkan bobot pengukuran 1 - 5, dengan 1 menunjukkan nilai
              rendah dan 5 menunjukkan kinerja sangat baik.
            </DialogDescription>
          </DialogHeader>
          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <div>
                <FormField
                  control={form.control}
                  name="kriteriaId"
                  render={({ field }) => (
                    <FormItem>
                      <MyParagraph>Kriteria</MyParagraph>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl
                          style={{ border: `1px solid ${currentColor}` }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a kriteria to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent
                          style={{ border: `1px solid ${currentColor}` }}
                        >
                          {dataKriteria.map((kriteria: any) => (
                            <SelectItem
                              value={kriteria.id}
                              key={kriteria.id}
                              className="select-item p-regular-14"
                            >
                              {kriteria.kriteria}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="subkriteria"
                  render={({ field }) => (
                    <FormItem>
                      <MyParagraph>Subriteria</MyParagraph>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Subriteria"
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
                name="bobot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bobot</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Bobot" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="flex flex-row items-center justify-end gap-2">
                <MyButton
                  text={loading ? " Creating please wait..." : "Add"}
                  type="submit"
                  disabled={loading ? true : false}
                />
              </DialogFooter>
            </form>
          </Form>
          {/* End of form */}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddSubkriteria;
