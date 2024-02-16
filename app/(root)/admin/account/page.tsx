"use client";
import MyCard from "@/app/components/ui/card";
import ComponentSeparator from "@/app/components/ui/componentSeparator";
import MyHeading from "@/app/components/ui/heading";
import MyImage from "@/app/components/ui/image";
import MyLabel from "@/app/components/ui/label";
import MyParagraph from "@/app/components/ui/paragraph";
import MySeparator from "@/app/components/ui/separator";
import MySpan from "@/app/components/ui/span";
import authService from "@/lib/service/authService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { GoKey } from "react-icons/go";
import MyProfile from "../../../components/profile/profile";
import UpdateData from "@/app/components/profile/updateData";
import UpdatePassword from "@/app/components/profile/updatePassword";
import axios from "axios";
const AccountAdmin = () => {
  const session: any = useSession();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  // console.log(session);
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
  console.log(profile);
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
export default AccountAdmin;
