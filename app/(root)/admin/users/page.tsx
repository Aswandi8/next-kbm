import MyCard from "@/app/components/ui/card";
import authService from "@/lib/service/authService";
import TabelUsers from "./tabelUsers";
import { DataTable } from "@/app/components/data-tabel/data-table";
import { columns } from "./columns";

export const metadata = {
  title: "Users",
};

async function getAllDataUsers() {
  const res = await authService.getAllUsers();
  if (!res.data) {
    return null;
  }
  return res.data.Data;
}
const UsersAdmin = async () => {
  const dataUsers = await getAllDataUsers();
  return (
    <>
      <div className="flex gap-4 flex-col">
        <MyCard>
          <h1>Users</h1>
        </MyCard>
        <MyCard>
          <h1>apa</h1>
          <DataTable columns={columns} data={dataUsers} />
        </MyCard>
      </div>
    </>
  );
};
export default UsersAdmin;
