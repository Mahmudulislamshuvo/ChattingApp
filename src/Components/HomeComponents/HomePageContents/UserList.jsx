import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import Userlist1 from "../../../assets/Home/Userslist/userlist1.jpg";
import Userlist2 from "../../../assets/Home/Userslist/userlist2.jpg";
import Userlist3 from "../../../assets/Home/Userslist/userlist3.jpg";
import Userlist4 from "../../../assets/Home/Userslist/userlist4.jpg";
import Userlist5 from "../../../assets/Home/Userslist/userlist5.jpg";
import Userlist6 from "../../../assets/Home/Userslist/userlist6.jpg";
import Userlist7 from "../../../assets/Home/Userslist/userlist7.jpg";
import Userlist8 from "../../../assets/Home/Userslist/userlist8.jpg";

const UserList = () => {
  const Userlist = [
    {
      id: 1,
      imege: Userlist1,
      tittle: "Sumona",
      time: "Today, 12:29am",
      button: "Add",
    },
    {
      id: 2,
      imege: Userlist2,
      tittle: "Shuvo",
      time: "Today, 7:09pm",
      button: "Add",
    },
    {
      id: 3,
      imege: Userlist3,
      tittle: "Mohona",
      time: "Today, 05:23pm",
      button: "Add",
    },
    {
      id: 4,
      imege: Userlist4,
      tittle: "Ammu",
      time: "Yesterday, 8:56pm",
      button: "Add",
    },
    {
      id: 5,
      imege: Userlist5,
      tittle: "Shuborna",
      time: "Today, 8:56pm",
      button: "Add",
    },
    {
      id: 6,
      imege: Userlist6,
      tittle: "Riya",
      time: "Tue, 5:32pm",
      button: "Add",
    },
    {
      id: 7,
      imege: Userlist7,
      tittle: "Ridiya",
      time: "Today, 11:56am",
      button: "Add",
    },
    {
      id: 8,
      imege: Userlist8,
      tittle: "Nusaiba",
      time: "Fri, 10:54pm",
      button: "Add",
    },
  ];

  return (
    <>
      <div className="h-[451px] w-[344px] rounded-[20px] shadow-[0px_5px_7px_-2px_rgba(18,18,18,0.56)]">
        <div className="pt-[13px]">
          <div className="flex w-[90] items-center justify-between text-wrap text-center">
            <h3 className="pl-[20px] font-Poppins text-[20px] font-semibold text-[#000]">
              User List
            </h3>
            <span>
              <HiDotsVertical className="cursor-pointer text-2xl text-ThemeColor" />
            </span>
          </div>

          {/* Parent with divide-y class */}
          <div className="h-[403px] divide-y divide-[rgba(0,0,0,0.25)] overflow-y-scroll">
            {/* Group Section 1 */}

            {Userlist?.map((items) => (
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
                  </div>
                  <div>
                    <h3 className="font-Poppins text-[14px] font-semibold">
                      {items.tittle}
                    </h3>
                    <p className="font-Poppins text-[12px] font-medium text-[rgba(77,77,77,0.73)]">
                      {items.time}
                    </p>
                  </div>
                </div>
                <div>
                  <button className="rounded-[5px] bg-ThemeColor px-[5px] font-Poppins text-[20px] font-semibold text-[#fff]">
                    {items.button}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
