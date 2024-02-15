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
import MyProfile from "./profile";
const AccountAdmin = () => {
  const { data: session } = useSession();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user.access_token && Object.keys(profile).length === 0) {
      const fetchData = async () => {
        try {
          const { data } = await authService.getProfile(
            session?.user.access_token || ""
          );
          setProfile(data);
        } catch (error) {
          console.error("An error occurred while fetching the data: ", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [profile, session]);

  return (
    <>
      <div className="flex gap-4 flex-col">
        <ComponentSeparator
          title="Data Sparepart"
          subTitle="Sparepart adalah"
          nav1="Dashboard"
          link1="/logistic/home"
          active="Data Sparepart"
        />

        <div className="flex flex-col md:flex-row gap-4 no-wrap">
          <div className="flex flex-col w-full md:w-3/12 gap-4">
            <MyProfile dataProfile={profile} />
            <MyCard>
              <MyHeading title="Similar Profiles" />
              <div className="grid grid-cols-3">
                <div className="text-center my-2">
                  <MyImage
                    src={
                      session?.user?.photo
                        ? session?.user?.photo
                        : "/assets/images/avatar.svg"
                    }
                    alt="profile"
                    className="h-16 w-16 rounded-full mx-auto"
                  />
                  <MyLabel title="Wandi" className="text-sm" />
                </div>
              </div>
            </MyCard>
          </div>
          <div className="flex flex-col w-full md:w-9/12 gap-4">
            <MyCard>
              <MySpan>
                <MyHeading title="Update Data" />
                <FaRegUser />
              </MySpan>
              <div className="mt-4">Form Update</div>
            </MyCard>
            <MyCard>
              <MySpan>
                <MyHeading title="Change Password" />
                <GoKey />
              </MySpan>
              <div className="mt-4">Form Update</div>
            </MyCard>
          </div>
        </div>
      </div>
    </>
  );
};
export default AccountAdmin;
