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
  mainHref: string;
}

export const navLinks: NavLink[] = [
  {
    id: 1,
    label: "Home",
    href: "/",
    mainHref: "#hero",
  },
  {
    id: 2,
    label: "About Us",
    href: "/about-us",
    mainHref: "/about-us",
  },
  {
    id: 3,
    label: "Articles",
    href: "/articles",
    mainHref: "#articles",
  },
  {
    id: 4,
    label: "Events",
    href: "/coming-soon",
    mainHref: "#events",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [openSheet, setOpenSheet] = useState(false);

  return (
    <div className="sticky top-0 py-4 bg-blueLTK drop-shadow z-10">
      <div className="relative flex flex-row justify-between items-center max-w-7xl mx-auto px-6">
        <Link href={"/"}>
          <Image
            src={"/main/Logo-LTK.png"}
            alt="Logo LTK"
            width={200}
            height={200}
          />
        </Link>
        <div className="hidden md:flex flex-row items-center gap-8">
          {navLinks.map((link) => {
            return (
              <Link
                href={pathname === "/" ? link.mainHref : link.href}
                className={`${
                  pathname === link.href || pathname.startsWith(link.href + "/")
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
            <Link href={"/sign-up"}>Join Us</Link>
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
                    href={pathname === "/" ? link.mainHref : link.href}
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
                <Link href={"/sign-up"}>Join Us</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
