"use client";
import MyButton from "@/app/components/ui/button";
import MyHeading from "@/app/components/ui/heading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStateContext } from "@/context/ContextProvider";
import kostService from "@/lib/service/kostService";
import kriteriaService from "@/lib/service/kriteriaService";
import { kriteriaParams } from "@/types";
import { AxiosError, AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTrashCan } from "react-icons/fa6";

const DeleteKriteria = ({ deleteKriteria }: { deleteKriteria: any }) => {
  const router = useRouter();
  const session: any = useSession();
  const { currentColor } = useStateContext();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async (kriteriaId: string) => {
    setLoading(true);
    await kriteriaService
      .deleteKriteria(kriteriaId, session.data?.user.access_token)
      .then((response: AxiosResponse) => {
        // Handle response
        toast.success(
          "Data kriteria deleted successfully",
          response.data.message
        );
        setLoading(false);
        setOpen(false);
        router.refresh();
      })
      .catch((reason: AxiosError<{ additionalInfo: string }>) => {
        if (reason.response?.status === 404) {
          setLoading(false);
          toast.error("Data kriteria does not exist in the Database");
        } else if (reason.response?.status === 403) {
          setLoading(false);
          toast.error("Access denied");
        } else {
          setLoading(false);
          toast.error("Oops Something Went wrong");
        }
      });
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <FaTrashCan className="text-red-500" />
        </DialogTrigger>
        <DialogContent
          className="w-full"
          style={{ border: `1px solid ${currentColor}` }}
        >
          <DialogHeader>
            <DialogTitle>
              <MyHeading title="Delete Kriteria" />
            </DialogTitle>
            <DialogDescription className="text-sm font-normal tracking-wide text-gray-400">
              Anda akan menghapus data berikut: <br />
              <br />
              Kriteria : {deleteKriteria.kriteria} <br />
              id :{deleteKriteria.id}
              <br />
              Apakah Anda yakin ingin melanjutkan penghapusan data ini? Tindakan
              ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          {/* Form */}
          <DialogFooter className="flex flex-row items-center justify-end gap-2">
            <MyButton text="Cancel" customFunc={() => setOpen(false)} />
            <MyButton
              text={loading ? "Deleting please wait..." : "Delete"}
              type="submit"
              disabled={loading ? true : false}
              className="!bg-red-500"
              customFunc={
                loading ? () => {} : () => handleDelete(deleteKriteria.id)
              }
            />
          </DialogFooter>
          {/* End of form */}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default DeleteKriteria;
