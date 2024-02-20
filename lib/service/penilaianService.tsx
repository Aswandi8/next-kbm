import { kostParams } from "@/types";
import instance from "../axios/instance";
const penilaianService = {
  addPenilaian: (dataKost: any) =>
    instance.post(`/api/superadmin/penilaian/${dataKost.kostId}`, dataKost),
};
export default penilaianService;
