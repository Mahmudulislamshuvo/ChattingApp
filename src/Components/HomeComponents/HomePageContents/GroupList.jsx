import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import HomeContentOne from "../../../assets/Home/one.png";
import HomeContentTwo from "../../../assets/Home/two.png";
import HomeContentThree from "../../../assets/Home/three.png";
import HomeContentFour from "../../../assets/Home/one.png";
import HomeContentFive from "../../../assets/Home/two.png";

const GroupList = () => {
  const users = [
    {
      id: 1,
      imege: HomeContentOne,
      tittle: "Friends Reunion",
      description: "Hi Guys, Wassup!",
      button: "Join",
    },
    {
      id: 2,
      imege: HomeContentTwo,
      tittle: "Friends Forever",
      description: "Good to see you.",
      button: "Join",
    },
    {
      id: 3,
      imege: HomeContentThree,
      tittle: "Crazy Cousins",
      description: "What plans today?",
      button: "Join",
    },
    {
      id: 4,
      imege: HomeContentFour,
      tittle: "Tech",
      description: "Hi Guys, Welcome",
      button: "Join",
    },
    {
      id: 5,
      imege: HomeContentFive,
      tittle: "EsMern 2306",
      description: "Welcome to Torture cell",
      button: "Join",
    },
  ];
  return (
    <div className="max-h-[450px] w-[427px] rounded-[20px] shadow-[0px_5px_7px_-2px_rgba(18,18,18,0.56)]">
      <div className="pt-[13px]">
        <div className="flex w-[90] items-center justify-between text-wrap text-center">
          <h3 className="pl-[20px] font-Poppins text-[20px] font-semibold text-[#000]">
            Groups List
          </h3>
          <span>
            <HiDotsVertical className="cursor-pointer text-2xl text-ThemeColor" />
          </span>
        </div>

        {/* Parent with divide-y class */}
        <div className="h-[400px] divide-y divide-[rgba(0,0,0,0.25)] overflow-y-scroll">
          {/* Group Section 1 */}
          {users?.map((items) => (
            <div className="flex items-center justify-between py-3.5 pl-[20px] pr-[39px] pt-[17px]">
              <div className="flex items-center">
                <div className="rounded-1/2 mr-[13px] h-[70] w-[70]">
                  <picture>
                    <img src={items.imege} alt="" />
                  </picture>
                </div>

                <div>
                  <h3 className="font-Poppins text-[18px] font-semibold">
                    {items.tittle}
                  </h3>
                  <p className="font-Poppins text-[14px] font-medium text-[rgba(77,77,77,0.73)]">
                    {items.description}
                  </p>
                </div>
              </div>

              <button className="rounded-[5px] bg-ThemeColor px-[22px] font-Poppins text-[20px] font-semibold text-[#fff]">
                {items.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupList;
