import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Friend from "../../../assets/Home/friend1.gif";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import moment from "moment";
import { getAuth } from "firebase/auth";

const Friends = () => {
  const auth = getAuth();
  const db = getDatabase();

  // All state
  const [friends, setfriends] = useState([]);
  // All state End
  /**
   * todo: fetch data from friends
   *
   * */
  useEffect(() => {
    let currentUid = auth.currentUser.uid;
    const FriendsDbRef = ref(db, "Friends/");
    onValue(FriendsDbRef, (snapshot) => {
      let friendsBalnkArr = [];
      snapshot.forEach((items) => {
        friendsBalnkArr.push({
          ...items.val(),
          friendsKey: items.key,
        });
      });
      setfriends(() => {
        return friendsBalnkArr.filter(
          (items) => items.reciverUid === currentUid,
        );
      });
    });
  }, [auth.currentUser.uid, db]);

  return (
    <div>
      <div className="h-[451px] w-[344px] rounded-[20px] shadow-[0px_5px_7px_-2px_rgba(18,18,18,0.56)]">
        <div className="pt-[13px]">
          <div className="flex w-[90] items-center justify-between text-wrap text-center">
            <h3 className="pl-[20px] font-Poppins text-[20px] font-semibold text-[#000]">
              <button
                type="button"
                class="relative inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white"
              >
                Friends
                <div class="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green-500 text-xs font-bold text-white dark:border-gray-900">
                  {friends.length > 0 ? friends.length : 0}
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
            {friends.length > 0 ? (
              friends?.map((items) => (
                <div className="flex items-center justify-between py-3.5 pl-[20px] pr-[39px] pt-[17px]">
                  <div className="flex items-center">
                    <div className="relative mr-[13px]">
                      <picture>
                        <img
                          src={
                            items.profile_picture
                              ? items.profile_picture
                              : Friend
                          }
                          alt={items.profile_picture}
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
                        {items.SenderName}
                      </h3>
                      <p className="font-Poppins text-[12px] font-medium text-[rgba(77,77,77,0.73)]">
                        {items.reciverName
                          ? items.reciverName + " Text you"
                          : "Hellow"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="font-Poppins text-[10px] font-medium text-[rgba(0,0,0,0.51)]">
                      {moment(items.createdDate).fromNow()}
                    </p>
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

export default Friends;
