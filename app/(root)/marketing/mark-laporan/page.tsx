import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import MySeparator from "@/app/components/ui/separator";
import MySpan from "@/app/components/ui/span";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const LaporanMarketing = () => {
  return (
    <>
      <div className="flex gap-4 flex-col">
        <ComponentSeparator
          title="Laporan"
          subTitle="Data Laporan"
          nav1="Dashboard"
          link1="/marketing/home"
          active="Laporan"
        />
        <MyCard>
          <div className="flex justify-between">
            <MyHeading title="Data Laporan" />
            <MySpan>
              <Link href="#" className="flex items-center gap-2">
                <FaPlus /> add data
              </Link>
            </MySpan>
          </div>
          <MySeparator label="horizontal" />
        </MyCard>
        {/* <MyProfile dataProfile={profile} /> */}
      </div>
    </>
  );
};
export default LaporanMarketing;
