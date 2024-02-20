import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import MySeparator from "@/app/components/ui/separator";
import MySpan from "@/app/components/ui/span";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const KasNeraca = () => {
  return (
    <>
      <div className="flex gap-4 flex-col">
        <ComponentSeparator
          title="Neraca Kas"
          subTitle="Data Neraca Kas"
          nav1="Dashboard"
          link1="/keuangan/home"
          active="Neraca Kas"
        />
        <MyCard>
          <div className="flex justify-between">
            <MyHeading title="Neraca Kas" />
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
export default KasNeraca;
