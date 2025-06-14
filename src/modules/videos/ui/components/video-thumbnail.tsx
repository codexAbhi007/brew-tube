import Image from "next/image";

export const VideoThumbnail = () => {
  return (
    <div className="relative">
      <div className="relative w-full overflow-hidden rounded-md aspect-video">
        <Image src="/placeholder.svg" alt="Thumbnail" fill className="size-full object-cover" />
      </div>
    </div>
  );
};
