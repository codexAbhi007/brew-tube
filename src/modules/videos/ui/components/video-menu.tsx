import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { APP_URL } from "@/constants";
import { PlaylistAddModal } from "@/modules/playlists/ui/components/playlist-add-modal";
import {
  ListPlusIcon,
  MoreVerticalIcon,
  ShareIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface VideoMenuProps {
  videoId: string;
  variant?: "ghost" | "secondary";
  onRemove?: () => void;
}

export const VideoMenu = ({
  videoId,
  variant = "ghost",
  onRemove,
}: VideoMenuProps) => {
  const [isOpenPlaylistAddModal, setIsOpenPlaylistAddModal] = useState(false);
  const onShare = () => {
    const fullUrl = `${APP_URL}/videos/${videoId}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("Link Copied to Clipboard");
  };

  return (
    <>
      <PlaylistAddModal
        open={isOpenPlaylistAddModal}
        onOpenChange={setIsOpenPlaylistAddModal}
        videoId={videoId}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild className="hover:cursor-pointer">
          <Button variant={variant} size="icon" className="rounded-full">
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem onClick={onShare} className="hover:cursor-pointer">
            <ShareIcon className="mr-2 size-4" />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsOpenPlaylistAddModal(true)}
            className="hover:cursor-pointer"
          >
            <ListPlusIcon className="mr-2 size-4" />
            Add to Playlist
          </DropdownMenuItem>
          {onRemove && (
            <DropdownMenuItem
              onClick={onRemove}
              className="hover:cursor-pointer"
            >
              <Trash2Icon className="mr-2 size-4" />
              Remove
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
