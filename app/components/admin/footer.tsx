import MyCard from "../ui/card";
import MyHeading from "../ui/heading";
import MyImage from "../ui/image";

const FooterAdmin = () => {
  return (
    <>
      <MyCard>
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
          <MyImage alt="logo" src="/assets/images/logo.png" className="w-32" />
          <MyHeading
            title="2024 © All Rights reserved."
            className="text-sm font-normal"
          />
        </div>
      </MyCard>
    </>
  );
};
export default FooterAdmin;
