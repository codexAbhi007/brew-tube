"use client";

import { InfiniteScroll } from "@/components/infinite-scroll";
import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useRouter } from "next/navigation";
import { VideoThumbnail } from "@/modules/videos/ui/components/video-thumbnail";
import { snakeCaseToTitle } from "@/lib/utils";
import { format } from "date-fns";
import { Globe2Icon, LockIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const VideosSection = () => {
  return (
    <Suspense fallback={<VideoSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error!</p>}>
        <VideosSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const VideoSectionSkeleton = () => {
  return (
    <>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow className="text-md">
              <TableHead className="w-[510px]">Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right ">Views</TableHead>
              <TableHead className="text-right ">Comments</TableHead>
              <TableHead className="text-right pr-6 ">
                Likes vs Dislikes
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 8 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-20 w-52 " />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-[100px] " />
                      <Skeleton className="h-3 w-[150px] " />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-3 w-16 " />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-3 w-12 " />
                </TableCell>
                <TableCell className="text-left">
                  <Skeleton className="h-3 w-14 " />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-3 w-10  text-right ml-auto" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-3 w-10  text-right ml-auto" />
                </TableCell>
                <TableCell className="text-right pr-6">
                  <Skeleton className="h-3 w-10  text-right ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

const VideosSectionSuspense = () => {
  const [videos, query] = trpc.studio.getMany.useSuspenseInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const router = useRouter();
  return (
    <div>
      <div className="border-y">
        <Table className="">
          <TableHeader className="text-sm">
            <TableRow>
              <TableHead className=" w-[510px] text-sm ">Video</TableHead>
              <TableHead className="text-sm">Visibility</TableHead>
              <TableHead className="text-sm">Status</TableHead>
              <TableHead className="text-sm">Date</TableHead>
              <TableHead className="text-right text-sm ">Views</TableHead>
              <TableHead className="text-right text-sm ">Comments</TableHead>
              <TableHead className="text-right text-sm pr-6 ">
                Likes vs Dislikes
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.pages
              .flatMap((page) => page.items)
              .map((video) => (
                <TableRow
                  onClick={() => router.push(`/studio/videos/${video.id}`)}
                  key={video.id}
                  className="cursor-pointer "
                >
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="relative aspect-video w-36 shrink-0">
                        <VideoThumbnail
                          imageUrl={video.thumbnailUrl}
                          previewUrl={video.previewUrl}
                          title={video.title}
                          duration={video.duration || 0}
                        />
                      </div>
                      <div className="flex flex-col overflow-hidden gap-y-1">
                        <span className="text-sm line-clamp-1 whitespace-normal">
                          {video.title}
                        </span>
                        <span className="text-xs text-muted-foreground line-clamp-1 whitespace-normal">
                          {video.description || "No description"}
                        </span>
                        <span></span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {video.visibility === "private" ? (
                        <LockIcon className="size-4 mr-2" />
                      ) : (
                        <Globe2Icon className="size-4 mr-2" />
                      )}
                      {snakeCaseToTitle(video.visibility)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {snakeCaseToTitle(video.muxStatus || "error")}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm truncate">
                    {format(new Date(video.createdAt), "d MMM yyyy")}
                  </TableCell>
                  <TableCell className="text-right  text-sm">
                    {video.viewCount}
                  </TableCell>
                  {/* TODO: No of COmments */}
                  <TableCell className="text-right  text-sm">{video.commentCount}</TableCell>
                  <TableCell className="text-right pr-6 text-sm">
                    <div className="flex flex-col">
                      <p>
                        {video.likeCount}
                        {video.likeCount > 1 ? " likes" : " like"}{" "}
                      </p>
                      <p>
                        {video.dislikeCount}
                        {video.dislikeCount > 1 ? " dislikes" : " dislike"}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <InfiniteScroll
        isManual
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </div>
  );
};
