import React, { useState } from "react";
import HomeLeftImg from "../../assets/HomeLeft.png";

import {
  FaHome,
  FaComments,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const HomeLeft = () => {
  const Location = useLocation();
  console.log();

  let active = Location.pathname.split("/")[2];
  return (
    <>
      <div className="mr-[63px] flex">
        {/* Sidebar */}
        <div className="flex h-full flex-col items-center rounded-[20px] bg-ThemeColor px-[43px] py-[39px] text-[rgba(255,255,255,0.72)]">
          <picture className="h-[100px] w-[100px]">
            <img src={HomeLeftImg} alt="HomeLeft.png" />
          </picture>
          <div className=" ">
            <ul className="mt-[97px] flex flex-col items-center gap-y-[82px] text-[45px]">
              <li
                className={
                  active === "contents"
                    ? `after:[""] relative flex w-[370%] cursor-pointer items-center justify-center rounded-bl-[20px] rounded-tl-[20px] bg-[#FFFFFF] py-[22px] text-ThemeColor after:absolute after:right-[-8px] after:top-0 after:h-full after:w-4 after:rounded-bl-[8px] after:rounded-tl-[8px] after:bg-ThemeColor`
                    : "cursor-pointer"
                }
              >
                <Link to={"contents"}>
                  <FaHome className="text-[45px]" />
                </Link>
              </li>
              <li
                className={
                  active === "chat"
                    ? `after:[""] relative flex w-[370%] cursor-pointer items-center justify-center rounded-bl-[20px] rounded-tl-[20px] bg-[#FFFFFF] py-[22px] text-ThemeColor after:absolute after:right-[-8px] after:top-0 after:h-full after:w-4 after:rounded-bl-[8px] after:rounded-tl-[8px] after:bg-ThemeColor`
                    : "cursor-pointer"
                }
              >
                <Link to={`/home/chat`}>
                  <FaComments className="text-[45px]" />
                </Link>
              </li>
              <li
                className={
                  active === "notifications"
                    ? `after:[""] relative flex w-[370%] cursor-pointer items-center justify-center rounded-bl-[20px] rounded-tl-[20px] bg-[#FFFFFF] py-[22px] text-ThemeColor after:absolute after:right-[-8px] after:top-0 after:h-full after:w-4 after:rounded-bl-[8px] after:rounded-tl-[8px] after:bg-ThemeColor`
                    : "cursor-pointer"
                }
              >
                <Link to={"/home/notifications"}>
                  <FaBell className="animate-bounce text-[45px]" />
                </Link>
              </li>
              <li
                className={
                  active === "settings"
                    ? `after:[""] relative flex w-[370%] cursor-pointer items-center justify-center rounded-bl-[20px] rounded-tl-[20px] bg-[#FFFFFF] py-[22px] text-ThemeColor after:absolute after:right-[-8px] after:top-0 after:h-full after:w-4 after:rounded-bl-[8px] after:rounded-tl-[8px] after:bg-ThemeColor`
                    : "cursor-pointer"
                }
              >
                <Link to={"/home/settings"}>
                  <FaCog className="animate-spin text-[45px]" />
                </Link>
              </li>
              <li
                className={
                  active === "logout"
                    ? `after:[""] relative mt-[100px] flex w-[370%] cursor-pointer items-center justify-center rounded-bl-[20px] rounded-tl-[20px] bg-[#FFFFFF] py-[22px] text-ThemeColor after:absolute after:right-[-8px] after:top-0 after:h-full after:w-4 after:rounded-bl-[8px] after:rounded-tl-[8px] after:bg-ThemeColor`
                    : "mt-[100px] cursor-pointer"
                }
              >
                <FaSignOutAlt className="animate-pulse text-[45px]" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeLeft;

// import React, { useState } from "react";
// import {
//   FaHome,
//   FaComments,
//   FaBell,
//   FaCog,
//   FaSignOutAlt,
// } from "react-icons/fa";

// const HomeLeft = () => {
//   const [active, setActive] = useState(null);

//   const handleClick = (icon) => {
//     setActive(icon);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="bg-ThemeColor text-white w-1/4 h-full flex flex-col items-center px-20 py-[39px] overflow-hidden">
//         <ul className="w-full">
//           <li
//             className={`relative ${
//               active === "home" ? "bg-white shadow-lg rounded-lg" : ""
//             } flex justify-center items-center mb-8`}
//             onClick={() => handleClick("home")}
//           >
//             <div
//               className={`text-ThemeColor flex justify-center items-center cursor-pointer ${
//                 active === "home"
//                   ? "bg-[#fff] pl-[45px] pr-[50px] py-[23px] text-center rounded-tl-[20px] rounded-bl-[20px]"
//                   : "text-[45px]"
//               }`}
//             >
//               <FaHome className=" text-[45px]" />
//             </div>
//             {active === "home" && (
//               <div className="absolute right-[-105px] h-full bg-ThemeColor rounded-lg"></div>
//             )}
//           </li>
//           <li
//             className={`text-[45px] cursor-pointer mb-8 ${
//               active === "comments" ? "text-ThemeColor" : ""
//             }`}
//             onClick={() => handleClick("comments")}
//           >
//             <FaComments />
//           </li>
//           <li
//             className={`text-[45px] cursor-pointer mb-8 ${
//               active === "bell" ? "text-ThemeColor" : ""
//             }`}
//             onClick={() => handleClick("bell")}
//           >
//             <FaBell />
//           </li>
//           <li
//             className={`text-[45px] cursor-pointer mb-8 ${
//               active === "cog" ? "text-ThemeColor" : ""
//             }`}
//             onClick={() => handleClick("cog")}
//           >
//             <FaCog />
//           </li>
//           <li
//             className={`text-[45px] cursor-pointer ${
//               active === "signout" ? "text-ThemeColor" : ""
//             }`}
//             onClick={() => handleClick("signout")}
//           >
//             <FaSignOutAlt />
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default HomeLeft;
