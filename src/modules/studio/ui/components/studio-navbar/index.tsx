"use client"

import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

import { AuthButton } from "@/modules/auth/ui/components/auth-button";
import { StudioUploadModal } from "../studio-upload-modal";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const StudioNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#0A0A0A] flex items-center px-2 pr-5 z-50 ">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and Logo */}
        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />
          <Link href="/studio">
            <div className="p-4 flex items-center ">
              <Image src="/logo.png" alt="logo" width={40} height={40} />
              <p className="text-xl font-semibold tracking-tight">
                Brew Studio
              </p>
            </div>
          </Link>
        </div>

        {/* Spacer  */}
        <div className="flex-1"></div>

        <div className="flex-shrink-0 items-center flex gap-4">
          <Button asChild variant="secondary">
            <Link href="/">
              <HomeIcon />
              <p className="hidden sm:block">Home</p>
            </Link>
          </Button>
          <div className="hidden sm:block">
          <StudioUploadModal />

          </div>
          <ThemeToggle/>
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};
