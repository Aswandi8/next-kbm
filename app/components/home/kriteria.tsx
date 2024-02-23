"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import kriteriaService from "@/lib/service/kriteriaService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MyButton from "../ui/button";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
const KriteriaFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [kriteriaData, setKriteriaData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const fetchedKriteriaData = await kriteriaService.getAllKriteria();
        setKriteriaData(fetchedKriteriaData.data.Data);
      } catch (error) {
        console.error("Error fetching data by ID:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataById();
  }, []);
  const onSelectCategory = (value: string, index: number) => {
    console.log("onSelectCategory", value, index);

    // Update the selected values array with the new value at the corresponding index
    setSelectedValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = value;
      return updatedValues;
    });
  };
  const handleApplyFilter = () => {
    // Now, 'selectedValues' array contains all the selected values
    console.log("Selected values:", selectedValues);

    // Build a new URL query string based on the selected values
    const newUrlQuery = selectedValues
      .map((value, index) => {
        return formUrlQuery({
          params: searchParams.toString(),
          key: `kriteria${index}`, // Use a unique key for each selected value
          value: value,
        });
      })
      .join("&");

    // Combine the new query string with the existing query parameters
    const newUrl = `${newUrlQuery}/`;
    // Update the URL with the new parameters
    //   router.push(router.pathname + newUrl, undefined, { scroll: false });
    router.push(newUrl, { scroll: false });

    // You can also trigger a data fetch or any other actions here
    // fetchDataBasedOnSelectedValues();
  };

  const handleClearFilter = () => {
    setSelectedValues([]);
    const newUrl = "/";
    router.push(newUrl, { scroll: false });
  };
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex w-full flex-col gap-5 md:flex-row items-center">
          {kriteriaData.map((kriteria: any, index: number) => (
            <Select
              key={kriteria.id}
              onValueChange={(value: string) => onSelectCategory(value, index)}
            >
              <SelectTrigger className="select-field">
                <SelectValue
                  placeholder={`kriteria ${kriteria.kriteria}`}
                  className="capitalize"
                />
              </SelectTrigger>
              <SelectContent>
                {kriteria?.subkriterias.map((subkriteria: any) => (
                  <SelectItem
                    value={subkriteria.subkriteria}
                    key={subkriteria.id}
                    className="select-item p-regular-14"
                  >
                    {subkriteria.subkriteria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
          <MyButton text="Apply Filter" customFunc={handleApplyFilter} />
          <MyButton text="Clear Filter" customFunc={handleClearFilter} />
        </div>
      )}
    </>
  );
};
export default KriteriaFilter;
