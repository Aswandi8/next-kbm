import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import MySpan from "@/app/components/ui/span";
import MySeparator from "@/app/components/ui/separator";

export const dynamic = "force-dynamic";

const PembelianAccounting = () => {
  return (
    <>
      <div className="flex gap-4 flex-col">
        <ComponentSeparator
          title="Data Pembelian"
          nav1="Dashboard"
          link1="/keuangan/home"
          active="Data Pembelian"
        />
        <MyCard>
          <div className="flex justify-between">
            <MyHeading title="Data Pembelian" />
            <MySpan>add data</MySpan>
          </div>
          <MySeparator label="horizontal" />
          {/* <DataTable columns={columns} data={data} /> */}
        </MyCard>
      </div>
    </>
  );
};
export default PembelianAccounting;
