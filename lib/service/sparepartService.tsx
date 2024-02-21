import { dataSparepartParams } from "@/types";
import instance from "../axios/instance";

const sparepartService = {
  getAllSparepart: () => instance.get("/api/logistic/sparepart"),
  getByIdSparepart: (id: string) =>
    instance.get(`/api/logistic/sparepart/${id}`),
  addSparepart: (dataSparepart: dataSparepartParams, token: string) =>
    instance.post("/api/logistic/sparepart", dataSparepart, {
      headers: {
        Authorization: token,
      },
    }),
};
export default sparepartService;
