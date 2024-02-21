"use client";
import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import MySeparator from "@/app/components/ui/separator";
import MySpan from "@/app/components/ui/span";
import Link from "next/link";
import { columns } from "./columns";
import { FaPlus } from "react-icons/fa6";
import { DataTable } from "./data-table";
import sparepartService from "@/lib/service/sparepartService";
import { useEffect, useState } from "react";
import MyLoading from "@/app/components/ui/myloading";

const SparepartLogistic = () => {
  const [sparepartData, setSparepartData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const fetchedSparepartData = await sparepartService.getAllSparepart();
        const responseData = fetchedSparepartData?.data?.Data ?? [];
        setSparepartData(responseData);
      } catch (error) {
        console.error("Error fetching data by ID:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataById();
  }, []);
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
          <div className="flex flex-col gap-4">
            <ComponentSeparator
              title="Data Sparepart"
              subTitle="Sparepart adalah"
              nav1="Dashboard"
              link1="/logistic/home"
              active="Data Sparepart"
            />
            <MyCard>
              <div className="flex justify-between">
                <MyHeading title="Data Sparepart" />
                <MySpan>
                  <Link
                    href="/logistic/sparepart/add-sparepart"
                    className="flex items-center gap-2"
                  >
                    <FaPlus />
                    Add data
                  </Link>
                </MySpan>
              </div>
              <MySeparator label="horizontal" />
              <DataTable columns={columns} data={sparepartData} />
            </MyCard>
          </div>
        </>
      )}
    </>
  );
};
export default SparepartLogistic;
