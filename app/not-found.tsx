import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Langkah Teman Kamu | 404 Not Found",
  description: "Page not found",
};

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center m-auto space-y-6">
      <div className="text-[35px] md:text-[48px] font-semibold text-center">
        Page Not Found
      </div>
      <Image
        src={"/main/errors/not-found.gif"}
        alt="not-found"
        width={300}
        height={300}
      />
      <Link href="/">
        <Button variant={"yellowLTK"} className="text-[14px]">
          Back to Home Page
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
