import { kriteriaParams } from "@/types";
import instance from "../axios/instance";
const kriteriaService = {
  getAllKriteria: () => instance.get("/api/superadmin/kriteria"),
  addKriteria: (dataKriteria: kriteriaParams) =>
    instance.post("/api/superadmin/kriteria", dataKriteria),
  deleteKriteria: (id: string, token: string) =>
    instance.delete(`/api/superadmin/kriteria/${id}`, {
      headers: {
        Authorization: token,
      },
    }),
  //   addKost: (dataKost: kostParams) =>
  //     instance.post("/api/superadmin/kost", dataKost),
  //   deleteKost: (id: string, token: string) =>
  //     instance.delete(`/api/superadmin/kost/${id}`, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     }),
};
export default kriteriaService;
