"use client";
import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import MySeparator from "@/app/components/ui/separator";
import kostService from "@/lib/service/kostService";
import kriteriaService from "@/lib/service/kriteriaService";
import { useEffect, useState } from "react";

const PenilaianKostSuperAdmin = ({ params }: { params: { id: string } }) => {
  const [kostData, setKostData] = useState<any>(null); // Change 'any' to match your data structure
  const [kriteriaData, setKriteriaData] = useState<any>(null); // Change 'any' to match your data structure
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
    // Call the fetchDataById function when the component mounts
    fetchDataById();
    // Cleanup function to cancel any pending requests on component unmount
    return () => {
      // Cleanup logic if needed
    };
  }, [params.id]);
  return (
    <>
      {loading ? (
        <p>Loading...</p>
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
              {/* Mapping over kriteriaData and rendering content for each kriteria */}
              {kriteriaData.map((kriteria: any) => (
                <div key={kriteria.id}>
                  <MyHeading title={kriteria.kriteria} className="capitalize" />
                  <h3>{kriteria.kriteria}</h3>
                  {/* Mapping over subkriterias and rendering content for each subkriteria */}
                  {kriteria.subkriterias.map((subkriteria: any) => (
                    <div key={subkriteria.id}>
                      <p>{subkriteria.subkriteria}</p>
                      {/* Render other content for each subkriteria */}
                    </div>
                  ))}
                </div>
              ))}
            </MyCard>
          </div>
        </>
      )}
    </>
  );
};
export default PenilaianKostSuperAdmin;
