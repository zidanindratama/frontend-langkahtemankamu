import { truncateText } from "@/helpers/truncateText";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Pulau Kecil Kabaena Terancam Hancur Akibat Ambisi Tambang Nikel",
    description:
      "Pulau Kabaena memiliki luas sebesar 837 km², yang terletak di antara Sulawesi Tenggara, Pulau Muna, dan Laut Banda. Pulau ini dulunya dikenal sebagai rumah bagi keanekaragaman hayati laut yang melimpah. Dihuni mayoritas oleh Suku Moronene dan Suku Bajau, pulau ini berfungsi sebagai penyangga ekosistem bawah laut yang vital. Namun, saat ini Kabaena menghadapi krisis ekologis dan pelanggaran hak asasi manusia yang serius akibat eksploitasi tambang nikel.",
    image: "/main/articles/article-1.png",
  },
  {
    id: 2,
    title:
      "Peraturan Menteri LHK Nomor 10 Tahun 2024 Sebagai Perlindungan Hukum Bagi aktivis Lingkungan",
    description:
      "Kerusakan lingkungan akibat tindakan manusia seperti deforestasi dan pencemaran limbah semakin meluas dan berdampak serius pada kesehatan planet serta kehidupan sehari-hari kita. Data menunjukkan bahwa kerusakan ini terjadi secara masif dari tahun ke tahun, dengan peningkatan frekuensi bencana ekologis dan penurunan kualitas lingkungan yang drastis.",
    image: "/main/articles/article-2.png",
  },
  {
    id: 3,
    title:
      "Sampah Impor Mikroplastik dari Australia Ancam Kesehatan Bayi di Jawa Timur",
    description:
      "Impor sampah plastik ke Indonesia, khususnya ke Jawa Timur, bukanlah fenomena baru. Pada tahun 2018, setelah Tiongkok berhenti menerima limbah plastik dari negara-negara Barat, Indonesia menjadi salah satu negara tujuan utama untuk mengelola limbah plastik tersebut. ",
    image: "/main/articles/article-3.png",
  },
];

const Articles = () => {
  return (
    <div className="relative py-12 md:py-20 bg-[#FFEE8E]">
      <div className="flex flex-col max-w-7xl justify-center mx-auto px-6">
        <h1 className="p-4 bg-yellowLTK w-fit uppercase font-bold text-base md:text-xl lg:text-2xl text-center mx-auto rounded-md">
          ARTICLES
        </h1>
        <Link href={"#"} className="flex flex-col mt-5 md:mt-10">
          <div className="relative">
            <Image
              src={"/main/articles/article-1.png"}
              alt="article-1"
              width={1500}
              height={1500}
              className="object-contain w-full h-full rounded-md"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-md"></div>
            <div className="absolute bottom-0 left-0">
              <div className="flex flex-col text-white p-2 md:p-6">
                <div className="flex flex-row">
                  <h1 className="md:font-semibold text-xs md:text-base">
                    Jun 09, 2024
                  </h1>
                </div>
                <h1 className="font-bold text-xs md:text-2xl lg:text-4xl mt-1 md:mt-3">
                  {truncateText(articles[0].title, 40)}
                </h1>
                <p className="hidden md:block mt-5">
                  {truncateText(articles[0].description, 300)}
                </p>
              </div>
            </div>
          </div>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 mt-5 md:mt-10">
          {articles.slice(1, 3).map((article) => {
            return (
              <Link href={`/events/#`} className="w-fit" key={article.id}>
                <div className="bg-white rounded-b-md rounded-t-xl">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={1000}
                    height={1000}
                    className="rounded-md"
                  />
                  <div className="p-5">
                    <h1 className="px-3 py-1 text-xs md:text-sm bg-yellowLTK w-fit rounded-md shadow-sm shadow-yellowLTK/90 mb-3">
                      May 04, 2023
                    </h1>
                    <h1 className="text-blueLTK uppercase font-bold text-base md:text-lg lg:text-2xl md:max-w-xs">
                      {truncateText(article.title, 30)}
                    </h1>
                    <p className="text-sm md:text-base mt-3">
                      {truncateText(article.description, 100)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <Button
          variant={"yellowLTK"}
          className="w-fit mx-auto font-bold mt-5 md:mt-10 text-xs md:text-base px-5 py-6"
          asChild
        >
          <Link
            href={"/events"}
            className="flex flex-row justify-between gap-4 uppercase"
          >
            <span>View More</span>
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Articles;
