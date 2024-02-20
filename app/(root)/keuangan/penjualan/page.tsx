import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import MySeparator from "@/app/components/ui/separator";
import MySpan from "@/app/components/ui/span";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const PembelianKeuangan = () => {
  return (
    <>
      <div className="flex gap-4 flex-col">
        <ComponentSeparator
          title="Penjualan"
          subTitle="Data Penjualan"
          nav1="Dashboard"
          link1="/keuangan/home"
          active="Penjualan"
        />
        <MyCard>
          <div className="flex justify-between">
            <MyHeading title="Data Penjualan" />
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
export default PembelianKeuangan;
