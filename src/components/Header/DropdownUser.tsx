import { useState } from "react";
import Link from "next/link";
import ClickOutside from "@/components/ClickOutside";
import { HiUser } from "react-icons/hi2";
import { RiSettings5Fill } from "react-icons/ri";
import { CgChevronDown } from "react-icons/cg";
import { AvatarUser } from "./AvatarUser";
import LogoutBouton from "../auth/logout-bouton";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-bold  text-gray-700 dark:text-white">
            Thomas Anree
          </span>
          <span className="block text-xs">UX Designer</span>
        </span>

        <span className="h-10 w-10 rounded-full">
          <AvatarUser />
        </span>
        
        <CgChevronDown className="hidden fill-current sm:block" />
      </Link>

      {/* <!-- Dropdown Start --> */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-6 dark:border-strokedark">
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary"
              >
                <HiUser />
                My Profile
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary"
              >
                <RiSettings5Fill />
                Account Settings
              </Link>
            </li>
          </ul>
          <LogoutBouton />
        </div>
      )}
      {/* <!-- Dropdown End --> */}
    </ClickOutside>
  );
};

export default DropdownUser;
