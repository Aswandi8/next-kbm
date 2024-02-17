import Link from "next/link";
import MyCard from "../ui/card";
import MyHeading from "../ui/heading";
import MyImage from "../ui/image";
import MyParagraph from "../ui/paragraph";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
const FooterAdmin = () => {
  const tahun = new Date().getFullYear();
  return (
    <>
      <MyCard>
        <div className="sm:flex sm:items-center sm:justify-between justify-center items-center">
          <div className="flex justify-center items-end gap-2">
            <MyImage
              src="/assets/images/bg-10.svg"
              alt="logo"
              className="h-12 w-auto"
            />
            <MyHeading
              title="santai"
              className="text-2xl font-bold uppercase "
            />
          </div>
          <MyParagraph className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Copyright &copy; 2024. All rights reserved.
          </MyParagraph>
        </div>
      </MyCard>
    </>
  );
};
export default FooterAdmin;
