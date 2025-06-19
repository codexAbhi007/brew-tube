import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { AuthButton } from "@/modules/auth/ui/components/auth-button";
import { Button } from "@/components/ui/button";
import { ClapperboardIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const HomeNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 flex items-center bg-background px-2 pr-5 z-50">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and Logo */}
        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />
          <Link href="/">
            <div className="p-4 flex items-center ">  
              <Image src="/logo.png" alt="logo" width={50} height={50} />
              <p className=" text-sm md:text-xl font-semibold tracking-tight">BrewTube</p>
            </div>
          </Link>
        </div>  

        {/* Search Bar */}
        <div className="flex-1 flex justify-center max-w-[720px] mx-auto">
          <SearchInput />
        </div>
        <div className="flex-shrink-0 items-center flex gap-4 ">
        <div className="flex">
          <Button
            asChild
            variant="secondary"
            className=""
          >
            <Link href="/studio">
              <ClapperboardIcon />
              <p className="md:block hidden">Studio</p>
            </Link>
          </Button>
        </div>

        <ThemeToggle/>

        
          <AuthButton  />
        </div>
      </div>
    </nav>
  );
};
