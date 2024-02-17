import Link from "next/link";
import MyHeading from "../ui/heading";
import MyImage from "../ui/image";
import MyParagraph from "../ui/paragraph";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const FooterHome = () => {
  return (
    <>
      <footer className="bg-gray-300/50 dark:bg-slate-800/50 shadow-sm">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex justify-center items-end gap-2">
            <MyImage
              src="/assets/images/bg-10.svg"
              alt="logo"
              className="h-16   w-auto"
            />
            <MyHeading
              title="santai"
              className="text-4xl font-bold uppercase dark:!text-gray-200"
            />
          </div>
          <div className="mx-auto mt-6 max-w-lg text-center leading-relaxed">
            <MyHeading
              title="CONST ID : Inovasi Digital, Solusi Tak Terbatas"
              className="dark:!text-gray-200"
            />
            <MyParagraph className="mt-2 leading-30 dark:!text-gray-200">
              Selamat datang di layanan pencarian kost impianmu! Kami memahami
              betapa pentingnya memiliki tempat tinggal yang nyaman dan
              berkualitas untuk memulai kehidupan yang baik. Dengan layanan
              pencarian kost kami, Anda dapat dengan mudah menemukan kost sesuai
              dengan preferensi dan kebutuhan Anda.
            </MyParagraph>
          </div>
          <ul className="mt-12 flex justify-center gap-6 md:gap-8 ">
            <li>
              <Link
                href="https://www.facebook.com/profile.php?id=100087017271389&locale=id_ID"
                target="_blank"
                className="text-gray-700 transition hover:text-gray-700/75 dark:!text-gray-200"
              >
                <FaFacebook className="h-6 w-6" />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/basoaswandi/"
                target="_blank"
                className="text-gray-700 transition hover:text-gray-700/75 dark:!text-gray-200"
              >
                <RiInstagramFill className="h-6 w-6" />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                target="_blank"
                className="text-gray-700 transition hover:text-gray-700/75 dark:!text-gray-200"
              >
                <FaGoogle className="h-6 w-6" />
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/Aswandi8"
                target="_blank"
                className="text-gray-700 transition hover:text-gray-700/75 dark:!text-gray-200"
              >
                <FaGithub className="h-6 w-6" />
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};
export default FooterHome;
