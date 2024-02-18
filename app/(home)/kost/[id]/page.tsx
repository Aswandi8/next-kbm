"use client";
import Collection from "@/app/components/home/collection";
import MyHeading from "@/app/components/ui/heading";
import MyImage from "@/app/components/ui/image";
import MyLabel from "@/app/components/ui/label";
import MyParagraph from "@/app/components/ui/paragraph";
import MySpan from "@/app/components/ui/span";
import kostService from "@/lib/service/kostService";
import { SearchParamProps, kostParams } from "@/types";
import { useEffect, useState } from "react";
import { FaRestroom } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineBedroomChild } from "react-icons/md";

const KostDetails = ({ params: { id }, searchParams }: SearchParamProps) => {
  const [kostData, setKostData] = useState<kostParams | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await kostService.getKostById(id);
        setKostData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id, searchParams.page]);
  const handleImageClick = (index: any) => {
    // Update the selected image index
    setSelectedImageIndex(index);
  };
  return (
    <>
      {kostData ? (
        <div>
          <div className="py-20 overflow-hidden bg-white font-poppins dark:bg-gray-800">
            <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full px-4 md:w-1/2 ">
                  <div className="sticky top-0 z-50 overflow-hidden ">
                    <div className="relative mb-6 lg:mb-10">
                      <MyImage
                        src={kostData.imageUrl[selectedImageIndex]}
                        alt="Product"
                        className="h-[400px] rounded object-cover"
                      />
                    </div>
                    <div className="flex-wrap flex items-center justify-center">
                      {kostData.imageUrl.map((image, index) => (
                        <div key={index} className="w-1/2 p-2 sm:w-1/4">
                          <MyImage
                            src={image}
                            alt="Product"
                            className="object-cover w-full h-24 md:h-32 cursor-pointer"
                            onClick={() => handleImageClick(index)} // Handle click event
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2 ">
                  <div className="lg:pl-20">
                    <div className="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700">
                      <MySpan className="flex flex-row items-center gap-2 !font-normal text-[12px] !text-gray-400">
                        <FaRestroom className="h-4 w-4" />
                        {kostData.category}
                      </MySpan>
                      <MyHeading
                        title={kostData.kost}
                        className="max-w-xl mt-2  text-xl font-bold dark:text-gray-300 md:text-4xl capitalize"
                      />
                      <MySpan className="flex flex-row items-center gap-2 mb-6 !font-normal text-[12px] !text-gray-400">
                        <FaLocationDot className="h-4 w-4" />
                        {kostData.location}
                      </MySpan>
                      <MyParagraph className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                        {kostData.description}
                      </MyParagraph>
                      <MyLabel
                        title={`Rp. ${kostData.price} /bln`}
                        className="inline-block !text-2xl font-semibold text-gray-700 dark:text-gray-400"
                      />
                    </div>
                    <div className="mb-8">
                      <MyHeading title="Fasilitas" />
                      <MyParagraph className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                        {kostData.url}
                      </MyParagraph>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default KostDetails;
