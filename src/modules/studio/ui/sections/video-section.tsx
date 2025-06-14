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
export const VideosSection = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Error!</p>}>
        <VideosSectionSuspense />
      </ErrorBoundary>
    </Suspense>
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
        <Table>
          <TableHeader >
            <TableRow className="text-md">
              <TableHead className=" w-[510px]">Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="">Views</TableHead>
              <TableHead className="">Comments</TableHead>
              <TableHead className="pr-6 ">Likes</TableHead>
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
                        <VideoThumbnail/>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>Visibility</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Views</TableCell>
                  <TableCell>Comments</TableCell>
                  <TableCell>Likes</TableCell>
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

//IsManual
