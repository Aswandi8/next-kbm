import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import MySpan from "@/app/components/ui/span";
import MySeparator from "@/app/components/ui/separator";

export const dynamic = "force-dynamic";

const LaporanMarketing = () => {
  return (
    <>
      <div className="flex gap-4 flex-col">
        <ComponentSeparator
          title=" Laporan"
          nav1="Dashboard"
          link1="/marketing/home"
          active="Data Laporan"
        />
        <MyCard>
          <div className="flex justify-between">
            <MyHeading title="Data Laporan" />
            <MySpan>add data</MySpan>
          </div>
          <MySeparator label="horizontal" />
          {/* <DataTable columns={columns} data={data} /> */}
        </MyCard>
      </div>
    </>
  );
};
export default LaporanMarketing;
