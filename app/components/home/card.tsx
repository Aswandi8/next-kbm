import { formatDateTime } from "@/lib/utils";
import { kostParamsHomes } from "@/types";
import Image from "next/image";
import Link from "next/link";
import MyImage from "../ui/image";
import { FaLocationDot } from "react-icons/fa6";
import { FaRestroom } from "react-icons/fa";
import { MdOutlineBedroomChild } from "react-icons/md";
import MySpan from "../ui/span";
import MyLabel from "../ui/label";
import MyHeading from "../ui/heading";
type CardProps = {
  event: kostParamsHomes;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};
const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const myImage = event.imageUrl[event.imageUrl.length - 1];
  return (
    <div className="group relative flex  w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-gray-300 dark:bg-slate-800 shadow-md transition-all hover:shadow-lg ">
      <div className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
        <Link href={`/kost/${event.id}`}>
          <MyImage
            src={myImage}
            alt="kost"
            className="h-56 w-full rounded-md object-cover"
          />
        </Link>

        <div className="mt-2">
          <MyLabel title={`Rp. ${event.price} /bln`} />
          <MyHeading title={event.kost} className="dark:!text-gray-200" />
          <MySpan className="dark:!text-gray-300">{event.location}</MySpan>
          <div className="mt-6 flex items-center gap-8 text-xs">
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <FaRestroom className="h-5 w-5" />
              <div className="mt-1.5 sm:mt-0">
                <MyLabel title="Tipe Kost" className="text-[12px]" />
                <MySpan className="text-[12px] dark:!text-gray-300">
                  {event.category}
                </MySpan>
              </div>
            </div>
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <MdOutlineBedroomChild className="h-5 w-5" />
              <div className="mt-1.5 sm:mt-0">
                <MyLabel title="Room" className="text-[12px]" />
                <MySpan className="text-[12px] dark:!text-gray-300">
                  {event.room}
                </MySpan>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
