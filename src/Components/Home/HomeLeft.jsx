import React, { useEffect, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { Uploader } from "uploader";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { FaCircleUser } from "react-icons/fa6";
import {
  FaHome,
  FaComments,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const HomeLeft = () => {
  const db = getDatabase();
  const auth = getAuth();
  const Location = useLocation();
  // uploader functionality start
  const uploader = Uploader({
    apiKey: "free",
  });

  let active = Location.pathname.split("/")[2];
  const [Usersinfo, setUsersinfo] = useState({});

  // auth provider userinfo
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid } = user;
        const userDbRef = ref(db, "/users");
        onValue(userDbRef, (snapshot) => {
          snapshot.forEach((items) => {
            if (items.val().uid === uid) {
              setUsersinfo(Object.assign(items.val(), { userKey: items.key }));
            }
          });
        });
      }
    });
  }, [db, auth]);

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
          console.log("File uploaded", files[0].fileUrl);
          const userDbRef = ref(db, `users/${Usersinfo.userKey}`);
          update(userDbRef, { profile_picture: files[0].fileUrl });
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
              className="relative flex h-full cursor-pointer items-center justify-center after:absolute after:right-0 after:top-0 after:h-[100px] after:w-[100px] after:rounded-full after:bg-[#dfd7d79f] after:content-['']"
              onClick={HandleProfileUpload}
            >
              <div className="h-[100px] w-[100px] rounded-full bg-[#837f7f]">
                {Usersinfo.profile_picture ? (
                  <img
                    src={Usersinfo.profile_picture}
                    alt="Profile"
                    className="rounded-full"
                  />
                ) : (
                  <FaCircleUser className="h-full w-full text-center text-[40px]" />
                )}
              </div>
              <MdOutlineCloudUpload className="absolute z-10 text-[30px]" />
            </div>
            {/* conditional render */}
            {/* {!Usersinfo.profile_picture && (
              <MdOutlineCloudUpload className="absolute z-10 text-[30px]" />
            )}

            {!Usersinfo.profile_picture && (
              <div className="absolute right-0 top-0 h-[100px] w-[100px] rounded-full bg-[#dfd7d79f]" />
            )} */}
          </div>
          <div>
            <h3 className="font-OpenSans text-[18px] font-bold text-white">
              {Usersinfo?.displayName?.length > 0 &&
                Usersinfo?.displayName?.split(" ")[0].slice(0, 8)}
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

// import React, { useEffect, useState } from "react";
// import HomeLeftImg from "../../assets/HomeLeft.png";
// import { getDatabase, ref, onValue } from "firebase/database";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { FaCircleUser } from "react-icons/fa6";
// import { Uploader } from "uploader";

// import {
//   FaHome,
//   FaComments,
//   FaBell,
//   FaCog,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";

// const HomeLeft = () => {
//   const db = getDatabase();
//   const uploader = Uploader({
//     apiKey: "free",
//   });
//   const Location = useLocation();
//   console.log();

//   let active = Location.pathname.split("/")[2];

//   // get userkey

//   useEffect(() => {
//     const starCountRef = ref(db, "/users");
//     onValue(starCountRef, (snapshot) => {
//       let Userinfo = [];
//       snapshot.forEach((items) => {
//         Userinfo.push({
//           email: items.val().email,
//           displayName: items.val().displayName,
//           uid: items.val().uid,
//           userKey: items.key,
//         });
//       });
//     });
//   });

//   // Uploader with faunctionality

//   const [picUrl, setpicUrl] = useState([]);

//   // Ensure that userKey and photoUrl are retrieved properly
//   const userKey = Usersinfo[0]?.userKey;
//   const userRef = ref(db, `users/${userKey}`);

//   // Handle Profile Picture Upload
//   const HandleProfileUpload = () => {
//     uploader
//       .open({
//         multi: false,
//         mimeTypes: ["image/*"],
//         editor: {
//           images: {
//             crop: true,
//             cropShape: "circ", // "rect" also supported
//             cropRatio: 1 / 1, // Ratio for circular crop
//           },
//         },
//       })
//       .then((files) => {
//         if (files.length === 0) {
//           console.log("No files selected.");
//         } else {
//           const imageUrl = files[0].fileUrl;
//           setphotoUrl(imageUrl);

//           // Ensure `userKey` is defined
//           if (userKey) {
//             const userRef = ref(db, `users/${userKey}`);
//             console.log(userKey);

//             // Use `update` instead of `set` to avoid overwriting the entire user data
//             update(userRef, {
//               picUrl: imageUrl, // Update only picUrl
//             })
//               .then(() => {
//                 console.log("Profile picture updated successfully");
//               })
//               .catch((error) => {
//                 console.error("Error updating profile picture:", error);
//               });
//           } else {
//             console.error(
//               "User key is undefined, cannot update profile picture",
//             );
//           }
//         }
//       })
//       .catch((err) => {
//         console.error("Error uploading image:", err);
//       });
//   };

//   return (
//     <>
//       <div className="mr-[63px] flex">
//         {/* Sidebar */}
//         <div className="reletive flex h-full flex-col items-center rounded-[20px] bg-ThemeColor px-[43px] py-[39px] text-[rgba(255,255,255,0.72)]">
//           <div
//             className="h-[100px] w-[100px] rounded-full bg-[#837f7f]"
//             onClick={HandleProfileUpload}
//           >
//             <picture className="flex h-full items-center justify-center">
//               <img
//                 src={<FaCircleUser className="h-full text-[40px]" />}
//                 alt=""
//               />
//             </picture>
//           </div>

//           <IoCloudUploadOutline className="absolute text-[30px]" />
//           <div>
//             <h4>Shuvo</h4>
//           </div>
//           <div className=" ">
//             <ul className="mt-[97px] flex flex-col items-center gap-y-[82px] text-[45px]">
//               <li
//                 className={
//                   active === "contents"
//                     ? `after:[""] relative flex w-[370%] cursor-pointer items-center justify-center rounded-bl-[20px] rounded-tl-[20px] bg-[#FFFFFF] py-[22px] text-ThemeColor after:absolute after:right-[-8px] after:top-0 after:h-full after:w-4 after:rounded-bl-[8px] after:rounded-tl-[8px] after:bg-ThemeColor`
//                     : "cursor-pointer"
//                 }
//               >
//                 <Link to={"contents"}>
//                   <FaHome className="text-[45px]" />
//                 </Link>
//               </li>
//               <li
//                 className={
//                   active === "chat"
//                     ? `after:[""] relative flex w-[370%] cursor-pointer items-center justify-center rounded-bl-[20px] rounded-tl-[20px] bg-[#FFFFFF] py-[22px] text-ThemeColor after:absolute after:right-[-8px] after:top-0 after:h-full after:w-4 after:rounded-bl-[8px] after:rounded-tl-[8px] after:bg-ThemeColor`
//                     : "cursor-pointer"
//                 }
//               >
//                 <Link to={`/home/chat`}>
//                   <FaComments className="text-[45px]" />
//                 </Link>
//               </li>
//               <li
//                 className={
//                   active === "notifications"
//                     ? `after:[""] relative flex w-[370%] cursor-pointer items-center justify-center rounded-bl-[20px] rounded-tl-[20px] bg-[#FFFFFF] py-[22px] text-ThemeColor after:absolute after:right-[-8px] after:top-0 after:h-full after:w-4 after:rounded-bl-[8px] after:rounded-tl-[8px] after:bg-ThemeColor`
//                     : "cursor-pointer"
//                 }
//               >
//                 <Link to={"/home/notifications"}>
//                   <FaBell className="animate-bounce text-[45px]" />
//                 </Link>
//               </li>
//               <li
//                 className={
//                   active === "settings"
//                     ? `after:[""] relative flex w-[370%] cursor-pointer items-center justify-center rounded-bl-[20px] rounded-tl-[20px] bg-[#FFFFFF] py-[22px] text-ThemeColor after:absolute after:right-[-8px] after:top-0 after:h-full after:w-4 after:rounded-bl-[8px] after:rounded-tl-[8px] after:bg-ThemeColor`
//                     : "cursor-pointer"
//                 }
//               >
//                 <Link to={"/home/settings"}>
//                   <FaCog className="animate-spin text-[45px]" />
//                 </Link>
//               </li>
//               <li
//                 className={
//                   active === "logout"
//                     ? `after:[""] relative mt-[100px] flex w-[370%] cursor-pointer items-center justify-center rounded-bl-[20px] rounded-tl-[20px] bg-[#FFFFFF] py-[22px] text-ThemeColor after:absolute after:right-[-8px] after:top-0 after:h-full after:w-4 after:rounded-bl-[8px] after:rounded-tl-[8px] after:bg-ThemeColor`
//                     : "mt-[100px] cursor-pointer"
//                 }
//               >
//                 <FaSignOutAlt className="animate-pulse text-[45px]" />
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HomeLeft;
