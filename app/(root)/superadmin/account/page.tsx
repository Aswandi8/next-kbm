"use client";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import authService from "@/lib/service/authService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import MyProfile from "@/app/components/profile/profile";
const AccountSuperadmin = () => {
  const session: any = useSession();
  const [profile, setProfile] = useState({});
  useEffect(() => {
    if (session.data?.user.access_token && Object.keys(profile).length === 0) {
      const fetchData = async () => {
        try {
          const { data } = await authService.getProfile(
            session.data?.user.access_token
          );
          setProfile(data.data);
        } catch (error) {
          console.error("Error fetching data wandi:", error);
        }
      };
      fetchData();
    }
  }, [profile, session]);
  return (
    <>
      <div className="flex gap-4 flex-col">
        <ComponentSeparator
          title="Account"
          subTitle="My Profile"
          nav1="Dashboard"
          link1="/admin/home"
          active="Account"
        />
        <MyProfile dataProfile={profile} />
      </div>
    </>
  );
};
export default AccountSuperadmin;
