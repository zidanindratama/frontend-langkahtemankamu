"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HiBars3BottomRight } from "react-icons/hi2";
import React, { useState } from "react";

interface NavLink {
  id: number;
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  {
    id: 1,
    label: "Home",
    href: "/",
  },
  {
    id: 2,
    label: "About Us",
    href: "/about-us",
  },
  {
    id: 3,
    label: "Articles",
    href: "/articles",
  },
  {
    id: 4,
    label: "Events",
    href: "/events",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [openSheet, setOpenSheet] = useState(false);

  return (
    <div className="sticky top-0 py-4 bg-blueLTK drop-shadow z-10">
      <div className="relative flex flex-row justify-between items-center max-w-7xl mx-auto px-6">
        <Image
          src={"/main/Logo-LTK.png"}
          alt="Logo LTK"
          width={200}
          height={200}
        />
        <div className="hidden md:flex flex-row items-center gap-8">
          {navLinks.map((link) => {
            return (
              <Link
                href={link.href}
                className={`${
                  pathname === `${link.href}`
                    ? "text-yellowLTK after:absolute after:bottom-0 after:inset-x-0 after:h-[3px] after:rounded after:bg-yellowLTK"
                    : "hover:text-yellowLTK"
                } text-base text-white relative pb-1 font-semibold`}
                key={link.id}
              >
                {link.label}
              </Link>
            );
          })}
          <Button variant={"yellowLTK"} className="font-semibold px-10" asChild>
            <Link
              href={
                process.env.NODE_ENV === "development"
                  ? "/login"
                  : "/coming-soon"
              }
            >
              Join Us
            </Link>
          </Button>
        </div>
        <div className="md:hidden flex flex-col">
          <Sheet open={openSheet} onOpenChange={setOpenSheet}>
            <SheetTrigger>
              <HiBars3BottomRight className="text-white h-6 w-6 cursor-pointer" />
            </SheetTrigger>
            <SheetContent className="flex flex-col pt-20">
              {navLinks.map((link) => {
                return (
                  <Link
                    href={link.href}
                    onClick={() => {
                      setOpenSheet(false);
                    }}
                    className={`${
                      pathname === `${link.href}`
                        ? "text-yellowLTK"
                        : "hover:text-yellowLTK text-black"
                    } text-base font-semibold`}
                    key={link.id}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Button
                variant={"yellowLTK"}
                className="font-semibold px-10"
                asChild
              >
                <Link
                  href={
                    process.env.NODE_ENV === "development"
                      ? "/login"
                      : "/coming-soon"
                  }
                >
                  Join Us
                </Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
