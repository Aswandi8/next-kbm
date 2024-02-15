"use client";
import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { useStateContext } from "@/context/ContextProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MyButton from "@/app/components/ui/button";
import MyParagraph from "@/app/components/ui/paragraph";
import MySpan from "@/app/components/ui/span";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import sparepartService from "@/lib/service/sparepartService";
import { AxiosError, AxiosResponse } from "axios";

const AddSparepart = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorProduksi, setErrorProduksi] = useState("");
  const [errorMerek, setErrorMerek] = useState("");
  const [errorType, setErrorType] = useState("");
  const [errorStock, setErrorStock] = useState("");
  const [errorSpesifikasi, setErrorSpesifikasi] = useState("");
  const [stockCount, setStockCount] = useState([
    { type: "", stock: 0, spesifikasi: "", merek: "" },
  ]);
  const [produksi, setProduksi] = useState("");
  const { currentColor } = useStateContext();
  const formSchema = yup.object().shape({
    sparepart: yup.string().required("sparepart is required"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const handleStock = (e: any, index: number, type: string) => {
    const values: any = [...stockCount];
    values[index][type] = e.target.value;
    setStockCount(values);
  };
  const onSelectProduksi = (produksiSelect: string) => {
    setProduksi(produksiSelect);
  };
  async function onSubmit(data: any) {}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <MyHeading title="Data Sparepart" className="mb-3" />
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <MyParagraph className="mb-2">Sparepart</MyParagraph>
                <Input
                  type="text"
                  {...register("sparepart")}
                  id="sparepart"
                  name="sparepart"
                  placeholder="Sparepart"
                  style={{ border: `1px solid ${currentColor}` }}
                  className={`border outline-offset-0 dark:placeholder:text-gray-500 dark:text-gray-200 text-slate-800 placeholder:text-gray-400 focus:border focus-visible:ring-0 focus-visible:ring-offset-0 shadow-sm bg-transparent`}
                />
                {errors.sparepart?.message && (
                  <small className="text-red-600/60 text-sm  -mt-2">
                    {errors.sparepart?.message}
                  </small>
                )}
              </div>
              <div>
                <MyParagraph className="mb-2">Produksi</MyParagraph>
                <Select
                  onValueChange={(value: string) => onSelectProduksi(value)}
                >
                  <SelectTrigger
                    style={{ border: `1px solid ${currentColor}` }}
                    className={`border outline-offset-0 dark:placeholder:text-gray-500 dark:text-gray-200 text-slate-800 placeholder:text-slate-300 focus:border focus-visible:ring-0 focus-visible:ring-offset-0 shadow-sm bg-transparent`}
                  >
                    <SelectValue placeholder="Produksi" />
                  </SelectTrigger>
                  <SelectContent className="">
                    <SelectItem value="Lokal">Lokal</SelectItem>
                    <SelectItem value="China">China</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                  </SelectContent>
                </Select>
                {errorProduksi && (
                  <small className="text-red-600/60 text-sm  -mt-2">
                    {errorProduksi}
                  </small>
                )}
              </div>
            </div>
            <MyHeading title="Type Sparepart" className="mb-3" />
            {stockCount.map(
              (
                item: {
                  type: string;
                  stock: number;
                  spesifikasi: string;
                  merek: string;
                },
                index: number
              ) => (
                <div key={index} className="flex flex-col gap-4 mb-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div>
                      <MyParagraph className="mb-2">Merek</MyParagraph>
                      <Input
                        type="text"
                        id="merek"
                        name="merek"
                        placeholder="Merek"
                        style={{ border: `1px solid ${currentColor}` }}
                        className={`border outline-offset-0 dark:placeholder:text-gray-500 dark:text-gray-200 text-slate-800 placeholder:text-gray-400 focus:border focus-visible:ring-0 focus-visible:ring-offset-0 shadow-sm bg-transparent`}
                        onChange={(e) => handleStock(e, index, "merek")}
                      />
                    </div>
                    <div>
                      <MyParagraph className="mb-2">Type</MyParagraph>
                      <Input
                        type="text"
                        id="type"
                        name="type"
                        placeholder="type"
                        style={{ border: `1px solid ${currentColor}` }}
                        className={`border outline-offset-0 dark:placeholder:text-gray-500 dark:text-gray-200 text-slate-800 placeholder:text-gray-400 focus:border focus-visible:ring-0 focus-visible:ring-offset-0 shadow-sm bg-transparent`}
                        onChange={(e) => handleStock(e, index, "type")}
                      />
                    </div>
                    <div>
                      <MyParagraph className="mb-2">Stock</MyParagraph>
                      <Input
                        type="number"
                        id="stock"
                        name="stock"
                        placeholder="stock"
                        style={{ border: `1px solid ${currentColor}` }}
                        className={`border outline-offset-0 dark:placeholder:text-gray-500 dark:text-gray-200 text-slate-800 placeholder:text-gray-400 focus:border focus-visible:ring-0 focus-visible:ring-offset-0 shadow-sm bg-transparent`}
                        onChange={(e) => handleStock(e, index, "stock")}
                      />
                    </div>
                  </div>
                  <div>
                    <MyParagraph className="mb-2">Spesifikasi</MyParagraph>
                    <Textarea
                      placeholder="Spesifikasi sparepart"
                      id="spesifikasi"
                      name="spesifikasi"
                      style={{ border: `1px solid ${currentColor}` }}
                      className={`border outline-offset-0 dark:placeholder:text-gray-500 dark:text-gray-200 text-slate-800 placeholder:text-gray-400 focus:border focus-visible:ring-0 focus-visible:ring-offset-0 shadow-sm bg-transparent`}
                      onChange={(e) => handleStock(e, index, "spesifikasi")}
                    />
                  </div>
                </div>
              )
            )}
            <div className="flex justify-end">
              <MyButton
                text="Add New Type Sparepart"
                type="button"
                customFunc={() =>
                  setStockCount([
                    ...stockCount,
                    { type: "", stock: 0, spesifikasi: "", merek: "" },
                  ])
                }
              />
            </div>
            <MyButton text={loading ? "Loading..." : "Submit"} type="submit" />
          </form>
        </MyCard>
      </div>
    </>
  );
};
export default AddSparepart;
