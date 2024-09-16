import React, { useEffect, useState } from "react";
import Userlist8 from "../../../assets/Home/Userslist/userlist8.jpg";
import { HiDotsVertical } from "react-icons/hi";
import {
  getDatabase,
  ref,
  onValue,
  set,
  remove,
  push,
} from "firebase/database";
import moment from "moment";
import { getAuth } from "firebase/auth";

const BlockUsers = () => {
  const db = getDatabase();
  const auth = getAuth();

  // All states
  const [blocklist, setblocklist] = useState([]);
  // All states end

  /**
   * todo: blockList Data fatching
   * @params ({})
   * */

  useEffect(() => {
    const blocklistDbRef = ref(db, "Block/");
    onValue(blocklistDbRef, (snapshot) => {
      let blocklistBlankArr = [];
      snapshot.forEach((items) => {
        if (auth.currentUser.uid === items.val().blockbyUid) {
          blocklistBlankArr.push({ ...items.val(), blockUserKey: items.key });
        }
      });
      setblocklist(blocklistBlankArr);
      // another way it will inside the state
      // const filterItems = blocklistBlankArr.filter(
      //   (items) => items.blockKey === auth.currentUser.uid,
      // );
      // return filterItems;
    });
  }, []);
  console.log(blocklist);

  /**
   * todo: Unblock finctionality implimentation
   * @perams ({items})
   * */

  const HandleUnblock = (items) => {
    set(push(ref(db, "Friends/")), {
      SenderName: items.whoblockedName,
      senderUid: items.whoblockedUip,
      senderemail: items.whoblockedEmail,
      reciverName: items.blockbyName,
      reciverUid: items.blockbyUid,
      reciverEmail: items.blockbyEmail,
      profile_picture: items.whoblocked_profile_picture,
      createdDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
    }).then(() => {
      const blockDbRef = ref(db, "Block/" + items.blockUserKey);
      remove(blockDbRef);
    });
  };
  // const HandleUnblock = (items) => {
  //   // Add the blocked user to the "Friends/" list
  //   set(push(ref(db, "Friends/")), {
  //     SenderName: items.whoblockedName,
  //     senderUid: items.whoblockedUip,
  //     senderemail: items.whoblockedEmail,
  //     reciverName: items.blockbyName,
  //     reciverUid: items.blockbyUid,
  //     reciverEmail: items.blockbyEmail,
  //     profile_picture: items.whoblocked_profile_picture,
  //     createdDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
  //   })
  //     .then(() => {
  //       // Correctly reference the blockUserKey here to remove the blocked user
  //       const blockDbRef = ref(db, "Block/" + items.blockUserKey);
  //       return remove(blockDbRef); // Remove the blocked user from "Block/" database
  //     })
  //     .then(() => {
  //       console.log("User unblocked and removed from block list");
  //     })
  //     .catch((error) => {
  //       console.error("Error unblocking user:", error);
  //     });
  // };

  return (
    <div>
      <div className="h-[462px] w-[344px] rounded-[20px] shadow-[0px_5px_7px_-2px_rgba(18,18,18,0.56)]">
        <div className="pt-[13px]">
          <div className="flex w-[90] items-center justify-between text-wrap text-center">
            <h3 className="pl-[20px] font-Poppins text-[20px] font-semibold text-[#000]">
              <button
                type="button"
                class="relative inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white"
              >
                Blocked Users
                <div class="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green-500 text-xs font-bold text-white dark:border-gray-900">
                  {blocklist.length > 0 ? blocklist.length : 0}
                </div>
              </button>
            </h3>
            <span>
              <HiDotsVertical className="cursor-pointer text-2xl text-ThemeColor" />
            </span>
          </div>

          {/* Parent with divide-y class */}
          <div className="h-[403px] divide-y divide-[rgba(0,0,0,0.25)] overflow-y-scroll">
            {/* Group Section 1 */}
            {blocklist.length > 0 ? (
              blocklist?.map((items) => (
                <div className="flex items-center justify-between py-3.5 pl-[20px] pr-[39px] pt-[17px]">
                  <div className="flex items-center">
                    <div className="relative mr-[13px]">
                      <picture>
                        <img
                          src={
                            items.whoblocked_profile_picture
                              ? items.whoblocked_profile_picture
                              : Userlist8
                          }
                          alt={
                            items.whoblocked_profile_picture
                              ? items.whoblocked_profile_picture
                              : Userlist8
                          }
                          className="h-[54px] w-[52px] rounded-full"
                        />
                      </picture>
                    </div>
                    <div>
                      <h3 className="font-Poppins text-[14px] font-semibold">
                        {items.whoblockedName}
                      </h3>
                      <p className="font-Poppins text-[12px] font-medium text-[rgba(77,77,77,0.73)]">
                        {moment(items.createDate).fromNow()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      className="rounded-[5px] bg-ThemeColor px-[8px] py-[3px] font-Poppins text-[16px] font-semibold text-[#fff]"
                      onClick={() => HandleUnblock(items)}
                    >
                      Unblock
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center">
                <h3 className="h-full pt-[50%]">No user found</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockUsers;
