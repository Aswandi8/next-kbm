import MyButton from "@/app/components/ui/button";
import MyButtonCircle from "@/app/components/ui/buttonCircle";
import MyCard from "@/app/components/ui/card";
import MyHeading from "@/app/components/ui/heading";
import MyLabel from "@/app/components/ui/label";
import { BiDollar } from "react-icons/bi";
export const metadata = {
  title: "Home",
};
const HomeAdmin = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-3">
        <MyCard className="bg-[url('/assets/images/bg-13.svg')] h-44 bg-no-repeat bg-cover bg-center lg:w-80 p-6 flex flex-col justify-between !bg-transparent !shadow-none">
          <div className="flex justify-between items-start gap-4">
            <div>
              <MyLabel title="Total Earning" className="font-bold" />
              <MyHeading
                title="$63,448.78"
                className="text-2xl font-bold"
                color={true}
              />
            </div>
            <MyButtonCircle>
              <BiDollar />
            </MyButtonCircle>
          </div>
          <div className="mt-6">
            <MyButton text="Download" />
          </div>
        </MyCard>
      </div>

      <MyCard>
        <h1>apa</h1>
      </MyCard>
    </div>
  );
};
export default HomeAdmin;
