import instance from "../axios/instance";
type addParams = {
  sparepart: string;
  produksi: string;
};
type typesParams = {
  type: string;
  stock: number;
  spesifikasi: string;
  merek: string;
}[];
const sparepartService = {
  getAllSparepart: () => instance.get("/api/logistic/sparepart"),
  addSparepart: (dataSparepart: addParams, types: typesParams) =>
    instance.post("/api/logistic/sparepart", { dataSparepart, types }),
};
export default sparepartService;
