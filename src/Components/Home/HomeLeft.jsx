import React, { useEffect, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { Uploader } from "uploader";
import { getDatabase, ref, onValue, set, update } from "firebase/database";

import {
  FaHome,
  FaComments,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const HomeLeft = () => {
  const db = getDatabase();
  const Location = useLocation();

  let active = Location.pathname.split("/")[2];

  // uploader functionality start
  const uploader = Uploader({
    apiKey: "free",
  });

  const [photoUrl, setphotoUrl] = useState("");
  const [Usersinfo, setUsersinfo] = useState([]);

  // auth provider userinfo

  useEffect(() => {
    const starCountRef = ref(db, "/users");
    onValue(starCountRef, (snapshot) => {
      let Userinfo = [];
      snapshot.forEach((item) => {
        Userinfo.push({
          email: item.val().email,
          uid: item.val().uid,
          displayName: item.val().displayName,
          userKey: item.key,
        });
      });
      setUsersinfo(Userinfo);
    });
  }, []);

  // const HandleProfileUpload = () => {
  //   uploader
  //     .open({
  //       multi: false,
  //       mimeTypes: ["image/*"],
  //       editor: {
  //         images: {
  //           crop: true,
  //           cropShape: "circ", // "rect" also supported.
  //           cropRatio: 1 / 1, // "1" is enforced for "circ".
  //         },
  //       },
  //     })
  //     .then((files) => {
  //       if (files.length === 0) {
  //         console.log("No files selected.");
  //       } else {
  //         console.log("Files uploaded:");

  //         console.log("ImageUrl ace naki?:", imageURL);
  //         setphotoUrl(files[0].fileUrl);
  //         update(ref(db, "users/", Usersinfo[0].userKey), {
  //           picUrl: files[0].fileUrl,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };
  // uploader functionality end

  const HandleProfileUpload = () => {
    uploader
      .open({
        multi: false,
        mimeTypes: ["image/*"],
        editor: {
          images: {
            crop: true,
            cropShape: "circ", // "rect" also supported.
            cropRatio: 1 / 1, // "1" is enforced for "circ".
          },
        },
      })
      .then((files) => {
        if (files.length === 0) {
          console.log("No files selected.");
        } else {
          const imageUrl = files[0].fileUrl;
          setphotoUrl(imageUrl);

          // Update picUrl in Firebase
          const userKey = Usersinfo[0]?.userKey; // Replace with appropriate key retrieval logic
          const userRef = ref(db, `users/${userKey}`);

          onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val(); // Get existing user data

              // Update only the picUrl while keeping other info
              set(userRef, {
                ...userData, // Spread existing data
                picUrl: imageUrl, // Update picUrl
              })
                .then(() => {
                  console.log("Profile picture updated successfully");
                })
                .catch((error) => {
                  console.error("Error updating profile picture: ", error);
                });
            }
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="mr-[63px] flex">
        {/* Sidebar */}
        <div className="flex h-full flex-col items-center rounded-[20px] bg-ThemeColor px-[43px] py-[35px] text-[rgba(255,255,255,0.72)]">
          <div className="h-[100px] w-[100px] rounded-full bg-white">
            <div
              className="relative flex h-full cursor-pointer items-center justify-center after:absolute after:right-0 after:top-0 after:h-[100px] after:w-[100px] after:rounded-full after:bg-[#8585859f] after:content-['']"
              onClick={HandleProfileUpload}
            >
              <picture>
                <img src={photoUrl} alt={photoUrl} className="rounded-full" />
              </picture>
              <MdOutlineCloudUpload className="absolute z-10 text-[30px]" />
            </div>
          </div>
          <div>
            <h3 className="font-OpenSans text-[18px] font-bold text-white">
              {Usersinfo.length > 0 &&
                Usersinfo[0]?.displayName?.split(" ")[0].slice(0, 8)}
            </h3>
          </div>
          <div className=" ">
            <ul className="mt-[97px] flex flex-col items-center gap-y-[76px] text-[45px]">
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
