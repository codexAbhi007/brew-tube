"use client";

import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { VideoPlayer, VideoPlayerSkeleton } from "../components/video-player";
import { VideoBanner } from "../components/video-banner";
import { VideoTopRow, VideoTopRowSkeleton } from "../components/video-top-row";
import { useAuth } from "@clerk/nextjs";

interface videoSectionProps {
  videoId: string;
}

export const VideoSection = ({ videoId }: videoSectionProps) => {
  return (
    <Suspense fallback={<VideoSectionSkeleton/>}>
      <ErrorBoundary fallback={<p>Error!</p>}>
        <VideoSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const VideoSectionSkeleton = () => {
  return (
    <>
      <VideoPlayerSkeleton/>
      <VideoTopRowSkeleton/>
    </>
  )
}



const VideoSectionSuspense = ({ videoId }: videoSectionProps) => {
  const { isSignedIn } = useAuth();
  const utils = trpc.useUtils()
  const [video] = trpc.videos.getOne.useSuspenseQuery({ id: videoId });

  const createView = trpc.videoViews.create.useMutation({
    onSuccess: () => {
      utils.videos.getOne.invalidate({id: videoId})
    }
  });

  const handlePlay = () => {
    if(!isSignedIn) return 
    createView.mutate({videoId})
  }

  return (
    <>
      <div
        className={cn(
          "aspect-video bg-black rounded-2xl overflow-hidden relative",
          video.muxStatus !== "ready" && "rounded-b-none"
        )}
      >
        <VideoPlayer
          autoPlay={false}
          onPlay={handlePlay}
          playbackId={video.muxPlaybackId}
          thumbnailUrl={video.thumbnailUrl}
        />
      </div>
      <VideoBanner status={video.muxStatus} />
      <VideoTopRow video={video} />
    </>
  );
};
