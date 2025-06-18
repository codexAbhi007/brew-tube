import { SearchIcon } from "lucide-react";

export const SearchInput = () => {
  //TODO: Add Search Functionality

  return (
    <form className=" flex w-full max-w-[600px] ">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-4 py-2 pr-12 rounded-l-full hover:cursor-pointer border focus:outline-none focus:border-blue-500  bg-white dark:bg-[#0A0A0A]"
        />
        {/* //Todo add remove search button */}
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 border border-l-0 rounded-r-full hover:cursor-pointer hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-[#0A0A0A]"
      >
        <SearchIcon className="size-5" />
      </button>
    </form>
  );
};
