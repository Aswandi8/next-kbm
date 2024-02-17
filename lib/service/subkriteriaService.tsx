import { addSubkriteriaParams } from "@/types";
import instance from "../axios/instance";
const subkriteriaService = {
  getAllSubkriteria: () => instance.get("/api/superadmin/sub-kriteria"),
  addKriteria: (dataSUbkriteria: addSubkriteriaParams) =>
    instance.post("/api/superadmin/sub-kriteria", dataSUbkriteria),
  deleteSubkriteria: (id: string, token: string) =>
    instance.delete(`/api/superadmin/sub-kriteria/${id}`, {
      headers: {
        Authorization: token,
      },
    }),
  //   deleteKriteria: (id: string, token: string) =>
  //     instance.delete(`/api/superadmin/kriteria/${id}`, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     }),
  //   addKost: (dataKost: kostParams) =>
  //     instance.post("/api/superadmin/kost", dataKost),
  //   deleteKost: (id: string, token: string) =>
  //     instance.delete(`/api/superadmin/kost/${id}`, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     }),
};
export default subkriteriaService;
