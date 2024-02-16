import MyCard from "@/app/components/ui/card";
import kostService from "@/lib/service/kostService";
import { columns } from "./columns";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import MySpan from "@/app/components/ui/span";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import MySeparator from "@/app/components/ui/separator";
import { DataTable } from "./tabelKost";

async function getAllDataKost() {
  const res = await kostService.getAllKost();
  return res.data.Data;
}
const KostSuperAdmin = async () => {
  const data = await getAllDataKost();
  return (
    <>
      <div className="flex gap-4 flex-col">
        <ComponentSeparator
          title="Data Kost"
          nav1="Dashboard"
          link1="/superadmin/home"
          active="Data Kost"
        />
        <MyCard>
          <div className="flex justify-between">
            <MyHeading title="Data Kost" />
            <MySpan>
              <Link
                href="/superadmin/kost/add-kost"
                className="flex items-center gap-2"
              >
                <FaPlus />
                Add data
              </Link>
            </MySpan>
          </div>
          <MySeparator label="horizontal" />
          <DataTable columns={columns} data={data} />
        </MyCard>
      </div>
    </>
  );
};
export default KostSuperAdmin;
