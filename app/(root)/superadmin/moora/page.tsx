"use client";
import { useEffect, useState } from "react";
import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import MySeparator from "@/app/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import kostService from "@/lib/service/kostService";
import Loading from "../loading";
import kriteriaService from "@/lib/service/kriteriaService";

const MooraSuperAdmin = () => {
  const [kostData, setKostData] = useState<any>([]);
  const [kriteriaData, setKriteriaData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
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

  const index1 = Math.sqrt(
    kostData.reduce((total: any, kost: any) => {
      const nilaiIndex1 = kost.penilaians?.[0]?.nilai[0] || 0;
      return total + nilaiIndex1 ** 2;
    }, 0)
  );
  const index2 = Math.sqrt(
    kostData.reduce((total: any, kost: any) => {
      const nilaiIndex1 = kost.penilaians?.[0]?.nilai[1] || 0;
      return total + nilaiIndex1 ** 2;
    }, 0)
  );
  const index3 = Math.sqrt(
    kostData.reduce((total: any, kost: any) => {
      const nilaiIndex1 = kost.penilaians?.[0]?.nilai[2] || 0;
      return total + nilaiIndex1 ** 2;
    }, 0)
  );
  const index4 = Math.sqrt(
    kostData.reduce((total: any, kost: any) => {
      const nilaiIndex1 = kost.penilaians?.[0]?.nilai[3] || 0;
      return total + nilaiIndex1 ** 2;
    }, 0)
  );
  const index5 = Math.sqrt(
    kostData.reduce((total: any, kost: any) => {
      const nilaiIndex1 = kost.penilaians?.[0]?.nilai[4] || 0;
      return total + nilaiIndex1 ** 2;
    }, 0)
  );
  console.log(kostData);
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
                    <table className="min-w-full divide-y-2 divide-gray-200  text-sm">
                      <thead className="ltr:text-left rtl:text-right">
                        <tr>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">
                            Kost
                          </th>
                          {kriteriaData.map((kriteria: any, index: number) => (
                            <>
                              <th
                                key={index}
                                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize"
                              >
                                {kriteria.kriteria}
                              </th>
                            </>
                          ))}
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200">
                        {kostData.map((kost: any, index: number) => (
                          <>
                            <tr key={index}>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {kost.kost}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {(kost.penilaians &&
                                  kost.penilaians[0] &&
                                  kost.penilaians[0].nilai[0]) ??
                                  0}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {(kost.penilaians &&
                                  kost.penilaians[0] &&
                                  kost.penilaians[0].nilai[1]) ??
                                  0}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {(kost.penilaians &&
                                  kost.penilaians[0] &&
                                  kost.penilaians[0].nilai[2]) ??
                                  0}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {(kost.penilaians &&
                                  kost.penilaians[0] &&
                                  kost.penilaians[0].nilai[3]) ??
                                  0}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {(kost.penilaians &&
                                  kost.penilaians[0] &&
                                  kost.penilaians[0].nilai[4]) ??
                                  0}
                              </td>
                            </tr>
                          </>
                        ))}
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
                          {kriteriaData.map((kriteria: any, index: number) => (
                            <>
                              <th
                                key={index}
                                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize"
                              >
                                {kriteria.kriteria}
                              </th>
                            </>
                          ))}
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200">
                        {kostData.map((kost: any, index: number) => (
                          <>
                            <tr key={index}>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {kost.kost}
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {
                                  (
                                    (kost.penilaians &&
                                      kost.penilaians[0] &&
                                      kost.penilaians[0].nilai[0] / index1) ??
                                    0
                                  )
                                    .toFixed(3) // Limit to three decimal places
                                    .replace(".", ",") // Replace decimal point with comma
                                }
                              </td>

                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {
                                  (
                                    (kost.penilaians &&
                                      kost.penilaians[0] &&
                                      kost.penilaians[0].nilai[1] / index2) ??
                                    0
                                  )
                                    .toFixed(3) // Limit to three decimal places
                                    .replace(".", ",") // Replace decimal point with comma
                                }
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {
                                  (
                                    (kost.penilaians &&
                                      kost.penilaians[0] &&
                                      kost.penilaians[0].nilai[2] / index3) ??
                                    0
                                  )
                                    .toFixed(3) // Limit to three decimal places
                                    .replace(".", ",") // Replace decimal point with comma
                                }
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {
                                  (
                                    (kost.penilaians &&
                                      kost.penilaians[0] &&
                                      kost.penilaians[0].nilai[3] / index4) ??
                                    0
                                  )
                                    .toFixed(3) // Limit to three decimal places
                                    .replace(".", ",") // Replace decimal point with comma
                                }
                              </td>
                              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {
                                  (
                                    (kost.penilaians &&
                                      kost.penilaians[0] &&
                                      kost.penilaians[0].nilai[4] / index5) ??
                                    0
                                  )
                                    .toFixed(3) // Limit to three decimal places
                                    .replace(".", ",") // Replace decimal point with comma
                                }
                              </td>
                            </tr>
                          </>
                        ))}
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
                </MyCard>
              </TabsContent>
              <TabsContent value="rangking">
                <MyCard>
                  <div className="flex justify-between">
                    <MyHeading title="Tabel Rangking" />
                  </div>
                  <MySeparator label="horizontal" />
                </MyCard>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </>
  );
};
export default MooraSuperAdmin;
