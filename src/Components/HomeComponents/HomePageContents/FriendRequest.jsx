import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import Request from "../../../assets/Home/Userslist/userlist4.jpg";
import Request2 from "../../../assets/Home/Userslist/userlist5.jpg";
import Request3 from "../../../assets/Home/Userslist/userlist6.jpg";
import Request4 from "../../../assets/Home/Userslist/userlist7.jpg";
import Request5 from "../../../assets/Home/Userslist/userlist8.jpg";

const FriendRequest = () => {
  const request = [
    {
      id: 1,
      imege: Request,
      tittle: "Shuvo",
      description: "Hi Guys, Wassup!",
      button: "Accept",
    },
    {
      id: 1,
      imege: Request2,
      tittle: "John",
      description: "Hi Guys, Wassup!",
      button: "Accept",
    },
    {
      id: 1,
      imege: Request3,
      tittle: "Marry Lean",
      description: "Hi Guys, Wassup!",
      button: "Accept",
    },
    {
      id: 1,
      imege: Request4,
      tittle: "Priya Joshi",
      description: "Hi Guys, Wassup!",
      button: "Accept",
    },
    {
      id: 1,
      imege: Request5,
      tittle: "Ridiya Islam",
      description: "Hi Guys, Wassup!",
      button: "Accept",
    },
  ];
  return (
    <div>
      <div className="h-[462px] w-[427px] rounded-[20px] shadow-[0px_5px_7px_-2px_rgba(18,18,18,0.56)]">
        <div className="pt-[13px]">
          <div className="flex w-[90] items-center justify-between text-wrap text-center">
            <h3 className="pl-[20px] font-Poppins text-[20px] font-semibold text-[#000]">
              Friend request
            </h3>
            <span>
              <HiDotsVertical className="cursor-pointer text-2xl text-ThemeColor" />
            </span>
          </div>

          {/* Parent with divide-y class */}
          <div className="h-[415px] divide-y divide-[rgba(0,0,0,0.25)] overflow-y-scroll">
            {/* Group Section 1 */}
            {request?.map((items) => (
              <div className="flex items-center justify-between py-3.5 pl-[20px] pr-[39px] pt-[17px]">
                <div className="flex items-center">
                  <div className="rounded-1/2 mr-[13px]">
                    <picture>
                      <img
                        src={items.imege}
                        alt={items.imege}
                        className="h-[70px] w-[70px] rounded-full"
                      />
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

                <button className="rounded-[5px] bg-ThemeColor px-[8px] font-Poppins text-[20px] font-semibold text-[#fff]">
                  {items.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
