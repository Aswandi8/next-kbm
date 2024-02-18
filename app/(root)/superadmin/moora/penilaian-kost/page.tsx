import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import MySeparator from "@/app/components/ui/separator";
import kostService from "@/lib/service/kostService";
import { DataTable } from "./tabelPenilaian";
import { columns } from "./columns";
async function getAllDataKost() {
  const res = await kostService.getAllKost();
  if (!res.data) {
    return null;
  }
  return res.data.Data;
}
const PenilaianSuperAdmin = async () => {
  const data = await getAllDataKost();
  return (
    <>
      <div className="flex gap-4 flex-col">
        <ComponentSeparator
          title="Penilaian Kost"
          nav1="Dashboard"
          link1="/superadmin/home"
          active="Penilaian Kost"
        />
        <MyCard>
          <div className="flex justify-between">
            <MyHeading title="Penilaian Kost" />
          </div>
          <MySeparator label="horizontal" />
          <DataTable columns={columns} data={data} />
        </MyCard>
      </div>
    </>
  );
};
export default PenilaianSuperAdmin;
