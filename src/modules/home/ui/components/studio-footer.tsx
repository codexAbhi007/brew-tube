import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { StudioUploadModal } from "@/modules/studio/ui/components/studio-upload-modal";

export const StudioFooter = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-10 py-8 flex items-center bg-background px-10 z-50 sm:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-4 w-full justify-center ">
        {/* Menu and Logo */}

        {/* Search Bar */}
       <Button asChild variant="secondary">
            <Link href="/">
              <HomeIcon />
              <p className="">Brew Tube</p>
            </Link>
          </Button>
          <StudioUploadModal/>
      </div>
    </nav>
  );
};
