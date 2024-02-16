import { kostParams } from "@/types";
import instance from "../axios/instance";
const kostService = {
  getAllKost: () => instance.get("/api/superadmin/kost"),
  addKost: (dataKost: kostParams) =>
    instance.post("/api/superadmin/kost", dataKost),
  deleteKost: (id: string, token: string) =>
    instance.delete(`/api/superadmin/kost/${id}`, {
      headers: {
        Authorization: token,
      },
    }),
};
export default kostService;
