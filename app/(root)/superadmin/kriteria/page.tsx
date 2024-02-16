import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import MySpan from "@/app/components/ui/span";
import MySeparator from "@/app/components/ui/separator";
import { DataTable } from "./tabelKriteria";
import { columns } from "./columns";
import kriteriaService from "@/lib/service/kriteriaService";
import AddKriteria from "./addKriteria";
export const dynamic = "force-dynamic";
async function getAllDataKriteria() {
  const res = await kriteriaService.getAllKriteria();
  if (!res.data) {
    return null;
  }
  return res.data.Data;
}
const KriteriaSuperadmin = async () => {
  const data = await getAllDataKriteria();
  return (
    <>
      <div className="flex gap-4 flex-col">
        <ComponentSeparator
          title="Data Kriteria"
          nav1="Dashboard"
          link1="/superadmin/home"
          active="Data Kriteria"
        />
        <MyCard>
          <div className="flex justify-between">
            <MyHeading title="Data Kriteria" />
            <MySpan>
              <AddKriteria />
            </MySpan>
          </div>
          <MySeparator label="horizontal" />
          <DataTable columns={columns} data={data} />
        </MyCard>
      </div>
    </>
  );
};
export default KriteriaSuperadmin;
