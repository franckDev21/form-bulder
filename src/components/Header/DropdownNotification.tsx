import { useState } from "react";
import Link from "next/link";
import ClickOutside from "@/components/ClickOutside";
import { GoBell } from "react-icons/go";

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li>
      
        <Link
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
          }}
          href="#"
          className="relative flex h-8 w-8 items-center justify-center rounded-full border-[0.5px] border-stroke bg-[#EFF4FB] hover:text-[#3C50E0] dark:border-[#2E3A47] dark:bg-meta-4 dark:text-white"
        >
          <GoBell className='text-gray-500' size={18} />
          <span
            className={`absolute -right-0.5 -top-0.5 z-1 h-2 w-2 rounded-full bg-red-500`}
          >
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
          </span>
        </Link>

        {dropdownOpen && (
          <div
            className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80`}
          >
            <div></div>
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;
