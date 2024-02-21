import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyLoading from "@/app/components/ui/myloading";

const AccountTeknisi = () => {
  return (
    <>
      <div className="flex gap-4 flex-col">
        <ComponentSeparator
          title="Account"
          subTitle="My Profile"
          nav1="Dashboard"
          link1="/teknisi/account"
          active="Account"
        />
        <MyLoading />
        {/* <MyProfile dataProfile={profile} /> */}
      </div>
    </>
  );
};
export default AccountTeknisi;
