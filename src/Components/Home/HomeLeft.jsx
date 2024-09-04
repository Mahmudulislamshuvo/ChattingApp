import React, { useState } from "react";
import HomeLeftImg from "../../assets/HomeLeft.png";

import {
  FaHome,
  FaComments,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const HomeLeft = ({ active }) => {
  return (
    <>
      <div className="flex my-[35px] mx-2">
        {/* Sidebar */}
        <div className="bg-ThemeColor text-[rgba(255,255,255,0.72)] h-full flex flex-col items-center  py-[39px] px-[43px] rounded-[20px]">
          <picture className="w-[100px] h-[100px]">
            <img src={HomeLeftImg} alt="HomeLeft.png" />
          </picture>
          <div className=" ">
            <ul className="flex flex-col items-center gap-y-[82px] mt-[97px] text-[45px] ">
              <li
                className={
                  active === "home"
                    ? "cursor-pointer bg-[#FFFFFF] text-ThemeColor w-[360%] flex justify-center items-center py-[22px] rounded-tl-[20px] rounded-bl-[20px]"
                    : "cursor-pointer"
                }
              >
                <FaHome className=" text-[45px] " />
              </li>
              <li
                className={
                  active === "home" ? "cursor-pointer" : "cursor-pointer"
                }
              >
                <FaComments className="text-[45px]" />
              </li>
              <li
                className={
                  active === "home" ? "cursor-pointer" : "cursor-pointer"
                }
              >
                <FaBell className=" text-[45px] " />
              </li>
              <li
                className={
                  active === "home" ? "cursor-pointer" : "cursor-pointer"
                }
              >
                <FaCog className=" text-[45px] animate-spin" />
              </li>
              <li
                className={
                  active === "home" ? "cursor-pointer" : "cursor-pointer"
                }
              >
                <FaSignOutAlt className=" text-[45px] mt-[100px] animate-pulse" />
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
