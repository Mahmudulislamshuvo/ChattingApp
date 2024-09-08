import React from "react";
import { LuSearch } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";

const Searchbar = ({ width }) => {
  return (
    <>
      <div className="relative flex">
        <input
          type="text"
          placeholder="Search"
          className={`w-full rounded-[20px] p-2 py-[17px] pl-14 shadow-[0px_5px_7px_-2px_rgba(18,18,18,0.56)]`}
          // style={{ width: width ? `${width}px` : "100%" }}
        />
        <span className="absolute left-[18px] top-[18px]">
          <LuSearch className="cursor-pointer text-2xl" />
        </span>
        <span className="absolute right-[18px] top-[18px] text-ThemeColor">
          <HiDotsVertical className="cursor-pointer text-2xl" />
        </span>
      </div>
    </>
  );
};

export default Searchbar;
