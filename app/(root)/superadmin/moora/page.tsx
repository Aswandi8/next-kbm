import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import MySeparator from "@/app/components/ui/separator";

const MooraSuperAdmin = () => {
  return (
    <>
      <div className="flex gap-4 flex-col">
        <ComponentSeparator
          title="Metode Moora"
          nav1="Dashboard"
          link1="/superadmin/home"
          active="Metode Moora"
        />
        <MyCard>
          <div className="flex justify-between">
            <MyHeading title="Metode Moora" />
          </div>
          <MySeparator label="horizontal" />
        </MyCard>
      </div>
    </>
  );
};
export default MooraSuperAdmin;
