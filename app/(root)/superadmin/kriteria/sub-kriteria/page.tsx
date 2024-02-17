import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import MySpan from "@/app/components/ui/span";
import MySeparator from "@/app/components/ui/separator";
import AddSubkriteria from "./addSubkriteria";
import subkriteriaService from "@/lib/service/subkriteriaService";
import { DataTable } from "./tabelSubkriteria";
import { columns } from "./columns";
import kriteriaService from "@/lib/service/kriteriaService";
export const dynamic = "force-dynamic";
async function getAllDataSubkriteria() {
  const res = await subkriteriaService.getAllSubkriteria();
  if (!res.data) {
    return null;
  }
  return res.data.Data;
}
async function getAllDataKriteria() {
  const res = await kriteriaService.getAllKriteria();
  if (!res.data) {
    return null;
  }
  return res.data.Data;
}
const subkriteriaSuperadmin = async () => {
  const data = await getAllDataSubkriteria();
  const dataKriteria = await getAllDataKriteria();
  return (
    <>
      <div className="flex gap-4 flex-col">
        <ComponentSeparator
          title="Data Subkriteria"
          nav1="Dashboard"
          link1="/superadmin/home"
          active="Data Subkriteria"
        />
        <MyCard>
          <div className="flex justify-between">
            <MyHeading title="Data Subkriteria" />
            <MySpan>
              <AddSubkriteria dataKriteria={dataKriteria} />
            </MySpan>
          </div>
          <MySeparator label="horizontal" />
          <DataTable columns={columns} data={data} />
        </MyCard>
      </div>
    </>
  );
};
export default subkriteriaSuperadmin;
