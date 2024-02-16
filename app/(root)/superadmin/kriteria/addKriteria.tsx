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
import { useStateContext } from "@/context/ContextProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import kriteriaService from "@/lib/service/kriteriaService";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  kriteria: z.string().min(3, "Kriteria must be at least 3 characters"),
  bobot: z.coerce.number().min(10, "Bobot must be at least 10").max(100),
});
const AddKriteria = () => {
  const router = useRouter();
  const { currentColor } = useStateContext();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kriteria: "",
      bobot: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    await kriteriaService
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
              <MyHeading title="Add Kriteria" />
            </DialogTitle>
            <DialogDescription className="text-sm font-normal tracking-wide text-gray-400">
              Kriteria ini akan digunakan dalam penilaian kost yang berdasarkan
              bobot pengukuran 10 - 100, dengan 10 menunjukkan nilai rendah dan
              100 menunjukkan kinerja sangat baik.
            </DialogDescription>
          </DialogHeader>
          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="kriteria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kriteria</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Kriteria" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
export default AddKriteria;
