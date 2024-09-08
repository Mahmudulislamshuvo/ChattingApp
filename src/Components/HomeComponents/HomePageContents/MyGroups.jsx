import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import Friend from "../../../assets/Home/friend1.gif";
import Friend2 from "../../../assets/Home/friend3.gif";
import Friend3 from "../../../assets/Home/friend2.gif";
import Friend4 from "../../../assets/Home/friend1.gif";

const MyGroups = () => {
  const Groups = [
    {
      id: 1,
      imege: Friend,
      tittle: "Sumona",
      description: "Dinner",
      time: "Today, 8:56pm",
      active: true,
    },
    {
      id: 2,
      imege: Friend3,
      tittle: "Shuvo",
      description: "Lunch",
      time: "Today, 8:56pm",
      active: true,
    },
    {
      id: 3,
      imege: Friend2,
      tittle: "Mohona",
      description: "Breakfast",
      time: "Today, 8:56pm",
      active: false,
    },
    {
      id: 4,
      imege: Friend4,
      tittle: "Ammu",
      description: "Good Eening",
      time: "Today, 8:56pm",
      active: true,
    },
    {
      id: 5,
      imege: Friend2,
      tittle: "Shuborna",
      description: "Chill bruh",
      time: "Today, 8:56pm",
      active: false,
    },
  ];
  return (
    <>
      <div className="h-[462px] w-[344px] rounded-[20px] shadow-[0px_5px_7px_-2px_rgba(18,18,18,0.56)]">
        <div className="pt-[13px]">
          <div className="flex w-[90] items-center justify-between text-wrap text-center">
            <h3 className="pl-[20px] font-Poppins text-[20px] font-semibold text-[#000]">
              My Groups
            </h3>
            <span>
              <HiDotsVertical className="cursor-pointer text-2xl text-ThemeColor" />
            </span>
          </div>

          {/* Parent with divide-y class */}
          <div className="h-[403px] divide-y divide-[rgba(0,0,0,0.25)] overflow-y-scroll">
            {/* Group Section 1 */}

            {Groups?.map((items) => (
              <div className="flex items-center justify-between py-3.5 pl-[20px] pr-[39px] pt-[17px]">
                <div className="flex items-center">
                  <div className="relative mr-[13px]">
                    <picture>
                      <img
                        src={items.imege}
                        alt=""
                        className="h-[54px] w-[52px] rounded-full"
                      />
                    </picture>
                    {items.active ? (
                      <span class="absolute bottom-1 right-1 flex h-3 w-3">
                        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                        <span class="relative inline-flex h-3 w-3 rounded-full bg-green-600"></span>
                      </span>
                    ) : (
                      <span class="absolute bottom-1 right-1 flex h-3 w-3">
                        <span class="relative inline-flex h-3 w-3 rounded-full bg-gray-500"></span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-Poppins text-[14px] font-semibold">
                      {items.tittle}
                    </h3>
                    <p className="font-Poppins text-[12px] font-medium text-[rgba(77,77,77,0.73)]">
                      {items.description}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-Poppins text-[10px] font-medium text-[rgba(0,0,0,0.51)]">
                    {items.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyGroups;
