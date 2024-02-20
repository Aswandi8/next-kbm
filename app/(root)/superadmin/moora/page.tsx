import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import MySeparator from "@/app/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const MooraSuperAdmin = () => {
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
          <div className="flex sm:flex-col flex-row items-center justify-center">
            <TabsList className="gap-6">
              <TabsTrigger value="alternatif">Alternatif</TabsTrigger>
              <TabsTrigger value="normalisasi">Normalisasi</TabsTrigger>
              <TabsTrigger value="optimasi">Optimasi</TabsTrigger>
              <TabsTrigger value="rangking">Rangking</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="alternatif">
            <MyCard>
              <div className="flex justify-between">
                <MyHeading title="Tabel Alternatif" />
              </div>
              <MySeparator label="horizontal" />
            </MyCard>
          </TabsContent>
          <TabsContent value="normalisasi">
            <MyCard>
              <div className="flex justify-between">
                <MyHeading title="Tabel Normalisasi" />
              </div>
              <MySeparator label="horizontal" />
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
        </Tabs>
      </div>
    </>
  );
};
export default MooraSuperAdmin;
