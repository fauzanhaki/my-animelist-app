import Link from "next/link";
import InputSearch from "./InputSearch";
import UserActionButton from "./UserActionButton";

const Navbar = () => {
  return (
    <header className="bg-color-slate-700 text-color-primary lg:px-8">
      <div className="flex flex-col justify-between gap-2 p-4 sm:flex-row md:items-center">
        <Link href="/" className="text-2xl font-bold">
          AnimeShelf
        </Link>
        <InputSearch />
        <UserActionButton />
      </div>
    </header>
  );
};

export default Navbar;
