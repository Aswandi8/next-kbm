import { Skeleton } from "@/components/ui/skeleton";
import MyCard from "./card";

const MyLoading = () => {
  return (
    <>
      <MyCard>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="sm:h-4  h-2 sm:w-[350px] w-[150px]" />
            <Skeleton className="sm:h-4  h-2 sm:w-[300px] w-[100px]" />
          </div>
        </div>
      </MyCard>
      <MyCard>
        <div className="flex justify-center items-center  h-96">
          <div className="flex justify-center  gap-4">
            <Skeleton className="sm:h-44 sm:w-40 h-24 w-20 rounded-sm" />
            <div className="flex flex-col justify-between gap-2">
              <div className="flex gap-2 flex-col">
                <Skeleton className="sm:h-4  h-2 sm:w-[350px] w-[150px]" />
                <Skeleton className="sm:h-4  h-2 sm:w-[300px] w-[100px]" />
                <Skeleton className="sm:h-4  h-2 sm:w-[250px] w-[50px]" />
              </div>
              <div className="flex gap-2 flex-col">
                <Skeleton className="sm:h-8 sm:w-32  h-4 w-12 rounde-lg" />
              </div>
            </div>
          </div>
        </div>
      </MyCard>
    </>
  );
};
export default MyLoading;
