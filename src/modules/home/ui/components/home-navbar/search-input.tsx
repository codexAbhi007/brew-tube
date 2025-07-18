"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { APP_URL } from "@/constants";
import { SearchIcon, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

export const SearchInput = () => {
  return (
    <Suspense fallback={<Skeleton className="h-10 w-full" />}>
      <SearchInputSuspense />
    </Suspense>
  );
};

const SearchInputSuspense = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const categoryId = searchParams.get("categoryId") || "";
  const router = useRouter();
  const [value, setValue] = useState(query);
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = new URL("/search", APP_URL);
    const newQuery = value.trim();

    url.searchParams.set("query", encodeURIComponent(newQuery));
    if (categoryId) {
      url.searchParams.set("categoryId", categoryId);
    }
    if (newQuery === "") {
      url.searchParams.delete("query");
    }

    setValue(newQuery);
    router.push(url.toString());
  };

  return (
    <form className=" flex w-full max-w-[600px] " onSubmit={handleSearch}>
      <div className="relative w-full">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Search"
          className="w-full pl-4 py-2 pr-12 rounded-l-full hover:cursor-pointer border focus:outline-none focus:border-amber-800 dark:focus:border-brew"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setValue("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
          >
            <XIcon className="dark:text-amber-500 text-amber-800" />
          </Button>
        )}
      </div>
      <button
        disabled={!value.trim()}
        type="submit"
        className="px-5 py-2.5 border border-l-0 rounded-r-full hover:cursor-pointer  disabled:opacity-50 disabled:cursor-not-allowed "
      >
        <SearchIcon className="size-5" />
      </button>
    </form>
  );
};
