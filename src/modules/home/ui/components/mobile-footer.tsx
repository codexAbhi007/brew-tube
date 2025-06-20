import { SearchInput } from "./home-navbar/search-input";

export const Footer = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-10 py-8 flex items-center bg-background px-10 z-50 sm:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and Logo */}

        {/* Search Bar */}
        <div className="flex-1 flex justify-center max-w-[450px] mx-auto">
          <SearchInput />
        </div>
      </div>
    </nav>
  );
};
