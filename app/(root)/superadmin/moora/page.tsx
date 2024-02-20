"use client";
import React from "react";
import { useEffect, useState } from "react";
import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import MySeparator from "@/app/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import kostService from "@/lib/service/kostService";
import Loading from "../loading";
import kriteriaService from "@/lib/service/kriteriaService";
const TableHeader = ({ kriteriaData }: { kriteriaData: any[] }) => (
  <thead className="ltr:text-left rtl:text-right">
    <tr>
      <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">
        Kost
      </th>
      {kriteriaData.map((kriteria: any, index: number) => (
        <th
          key={index}
          className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize"
        >
          {kriteria.kriteria}
        </th>
      ))}
    </tr>
  </thead>
);
const MooraSuperAdmin = () => {
  const [kostData, setKostData] = useState<any>([]);
  const [kriteriaData, setKriteriaData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [hasilOptimasiData, setHasilOptimasiData] = useState<any[]>([]);
  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const fetchedKostData = await kostService.getAllKost();
        const fetchedKriteriaData = await kriteriaService.getAllKriteria();
        setKostData(fetchedKostData.data.Data);
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
  }, []);

  // Normalisasi
  const calculateIndex = (index: number) => {
    return Math.sqrt(
      kostData.reduce((total: any, kost: any) => {
        const nilaiIndex = kost.penilaians?.[0]?.nilai[index] || 0;
        return total + nilaiIndex ** 2;
      }, 0)
    );
  };

  const renderTableData = () => {
    return kostData.map((kost: any) => (
      <tr key={kost.id}>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          {kost.kost}
        </td>
        {[0, 1, 2, 3, 4].map((index) => (
          <td
            key={index}
            className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
          >
            {(
              kost.penilaians &&
              kost.penilaians[0] &&
              kost.penilaians[0].nilai[index] / calculateIndex(index)
            )?.toLocaleString("id-ID", {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            }) ?? 0}
          </td>
        ))}
      </tr>
    ));
  };

  // Alternatif
  const renderTableCell = (kost: any, index: number) => (
    <td
      key={index}
      className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
    >
      {kost.penilaians?.[0]?.nilai[index] ?? 0}
    </td>
  );
  const renderTableRow = (kost: any, rowIndex: number) => (
    <tr key={rowIndex}>
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        {kost.kost}
      </td>
      {[0, 1, 2, 3, 4].map((index) => renderTableCell(kost, index))}
    </tr>
  );

  // Optimasi
  const calculateIndexOptimasi = (index: number) => {
    return Math.sqrt(
      kostData.reduce((total: any, kost: any) => {
        const nilaiIndex = kost.penilaians?.[0]?.nilai[index] || 0;
        return total + nilaiIndex ** 2;
      }, 0)
    );
  };
  const weights = kriteriaData.map((kriteria: any) => kriteria.bobot);
  const renderTableDataOptimasi = () => {
    return kostData.map((kost: any, rowIndex: number) => (
      <tr key={kost.id}>
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          {kost.kost}
        </td>
        {weights.map((weight: any, index: any) => (
          <td
            key={index}
            className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
          >
            {(
              (kost.penilaians &&
                kost.penilaians[0] &&
                (kost.penilaians[0].nilai[index] /
                  calculateIndexOptimasi(index) /
                  100) *
                  weight) ??
              0
            ).toLocaleString("id-ID", {
              minimumFractionDigits: 3,
              maximumFractionDigits: 3,
            })}
          </td>
        ))}
      </tr>
    ));
  };
  //  Rangking
  const calculateMinMaxValues = () => {
    const minValues: any = [];
    const maxValues: any = [];
    const yValues: any = [];
    kostData.forEach((kost: any, kostIndex: number) => {
      let nmin = 0;
      let nmax = 0;
      let yValue = 0;
      weights.forEach((weight: any, criterionIndex: number) => {
        const optimizationValue =
          (kost.penilaians &&
            kost.penilaians[0] &&
            (kost.penilaians[0].nilai[criterionIndex] /
              calculateIndexOptimasi(criterionIndex) /
              100) *
              weight) ??
          0;

        if (criterionIndex === 3 || criterionIndex === 4) {
          nmin += optimizationValue;
        } else if (
          criterionIndex === 0 ||
          criterionIndex === 1 ||
          criterionIndex === 2
        ) {
          nmax += optimizationValue;
        }
      });
      yValue = nmax - nmin;
      minValues.push(nmin);
      maxValues.push(nmax);
      yValues.push(yValue);
    });
    const ranking = Array.from(
      { length: kostData.length },
      (_, index) => index + 1
    );
    ranking.sort((a, b) => yValues[b - 1] - yValues[a - 1]);
    return { minValues, maxValues, yValues, ranking };
  };
  const { minValues, maxValues, yValues, ranking } = calculateMinMaxValues();
  return (
    <>
      <div className="flex gap-4 flex-col">
        <ComponentSeparator
          title="Metode Moora"
          nav1="Dashboard"
          link1="/superadmin/home"
          active="Metode Moora"
        />
        <Tabs defaultValue="alternatif" className="w-full">
          <div className="">
            <TabsList className="gap-2 flex  items-center justify-center">
              <TabsTrigger value="alternatif">Alternatif</TabsTrigger>
              <TabsTrigger value="normalisasi">Normalisasi</TabsTrigger>
              <TabsTrigger value="optimasi">Optimasi</TabsTrigger>
              <TabsTrigger value="rangking">Rangking</TabsTrigger>
            </TabsList>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <>
              <TabsContent value="alternatif">
                <MyCard>
                  <div className="flex justify-between">
                    <MyHeading title="Tabel Alternatif" />
                  </div>
                  <MySeparator label="horizontal" />
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                      <thead className="ltr:text-left rtl:text-right">
                        <tr>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">
                            Kost
                          </th>
                          {kriteriaData.map((kriteria: any, index: number) => (
                            <th
                              key={index}
                              className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize"
                            >
                              {kriteria.kriteria}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {kostData.map(renderTableRow)}
                      </tbody>
                    </table>
                  </div>
                </MyCard>
              </TabsContent>
              <TabsContent value="optimasi">
                <MyCard>
                  <div className="flex justify-between">
                    <MyHeading title="Tabel Optimasi" />
                  </div>
                  <MySeparator label="horizontal" />
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                      <TableHeader kriteriaData={kriteriaData} />
                      <tbody className="divide-y divide-gray-200">
                        {renderTableDataOptimasi()}
                      </tbody>
                    </table>
                  </div>
                </MyCard>
              </TabsContent>
              <TabsContent value="normalisasi">
                <MyCard>
                  <div className="flex justify-between">
                    <MyHeading title="Tabel Normalisasi" />
                  </div>
                  <MySeparator label="horizontal" />
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200  text-sm">
                      <thead className="ltr:text-left rtl:text-right">
                        <tr>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">
                            Kost
                          </th>
                          {kriteriaData.map((kriteria: any) => (
                            <th
                              key={kriteria.id}
                              className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize"
                            >
                              {kriteria.kriteria}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {renderTableData()}
                      </tbody>
                    </table>
                  </div>
                </MyCard>
              </TabsContent>
              <TabsContent value="rangking">
                <MyCard>
                  <div className="flex justify-between">
                    <MyHeading title="Tabel Rangking" />
                  </div>
                  <MySeparator label="horizontal" />
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                      <thead className="ltr:text-left rtl:text-right">
                        <tr>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Kost
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Min
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Max
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Max-Min
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Rangking
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {kostData.map((kost: any, kostIndex: number) => {
                          const { minValues, maxValues } =
                            calculateMinMaxValues();
                          return (
                            <tr key={kost.id}>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {kost.kost}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {minValues[kostIndex].toLocaleString("id-ID", {
                                  minimumFractionDigits: 3,
                                  maximumFractionDigits: 3,
                                })}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {maxValues[kostIndex].toLocaleString("id-ID", {
                                  minimumFractionDigits: 3,
                                  maximumFractionDigits: 3,
                                })}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {yValues[kostIndex].toLocaleString("id-ID", {
                                  minimumFractionDigits: 3,
                                  maximumFractionDigits: 3,
                                })}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {ranking[kostIndex]}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </MyCard>
              </TabsContent>
              {/* Add other tab contents here */}
            </>
          )}
        </Tabs>
      </div>
    </>
  );
};

export default MooraSuperAdmin;
