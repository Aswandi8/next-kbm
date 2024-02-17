"use client";

import MyButton from "../components/ui/button";
import MyHeading from "../components/ui/heading";
import MyImage from "../components/ui/image";
import MyParagraph from "../components/ui/paragraph";

export default function Home() {
  return (
    <div className="container my-8">
      <div>
        <section className="bg-contain py-5 md:py-10">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
            <div className="flex flex-col justify-center gap-8">
              <h1 className="text-xl lg:text-4xl  font-bold"></h1>
              <MyHeading
                className="text-2xl lg:text-4xl dark:!text-gray-200"
                title="Temukan Kost Impianmu, Hidup Nyaman Dimulai dari Tempat Tinggal
                Berkualitas "
              />
              <MyParagraph className="leading-30">
                Selamat datang di platform rekomendasi kost terdepan! Dengan
                beragam pilihan dan fasilitas, temukan tempat tinggal yang ideal
                untukmu. Raih kenyamanan hidup dengan mudah dan aman, mulai
                perjalanan pencarian kost impianmu bersama kami.
              </MyParagraph>
              <div>
                <MyButton text="Explore Now" customFunc={() => {}} />
              </div>
            </div>
            <MyImage
              src="/assets/images/bg-3.svg"
              alt="hero"
              className="w-full"
            />
          </div>
        </section>

        <section
          id="events"
          className="container my-8 flex flex-col gap-8 md:gap-12"
        >
          <h2 className="text-xl lg:text-4xl  font-bold">
            Pilih dengan percaya <br /> Hiduplah dengan nyaman
          </h2>
          <div className="flex w-full flex-col gap-5 md:flex-row items-center">
            {/* <Search /> */}
            {/* <CategoryFilter /> */}
          </div>
          {/* <Collection /> */}
          {/* <Collection '@/components/shared/Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        /> */}
        </section>
      </div>
    </div>
  );
}
