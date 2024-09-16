import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Request from "../../../assets/Home/Userslist/userlist3.jpg";
import Userlist1 from "../../../assets/Home/Userslist/userlist1.jpg";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
import { toast, Slide } from "react-toastify";

const FriendRequest = () => {
  const db = getDatabase();
  const auth = getAuth();

  /**
   * todo: friendrequest functionality
   */
  // All state
  const [friendReqList, setfriendReqList] = useState([]);

  useEffect(() => {
    const friendReqDbRef = ref(db, "FriendRequest");
    onValue(friendReqDbRef, (snapshot) => {
      let friendReqBlankArr = [];
      snapshot.forEach((items) => {
        if (items.val().reciverUid === auth.currentUser.uid) {
          friendReqBlankArr.push({ ...items.val(), friendReqKey: items.key });
        }
      });
      setfriendReqList(friendReqBlankArr);
    });
  }, [db]);

  /**
   * todo: Accept friend req btn
   */
  const HandleReqAceept = (items) => {
    set(push(ref(db, "Friends/")), {
      ...items,
      createdDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
    })
      .then(() => {
        const friendReqDbRef = ref(db, `FriendRequest/${items.friendReqKey}`);
        remove(friendReqDbRef);
      })
      .then(() => {
        toast.success(`You accepted ${items.SenderName}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      });
  };

  /**
   * todo: Friend Request Cancel Functionality
   * @param ({items})
   * */

  const HandleReqCancel = (items) => {
    const friendReqDbRef = ref(db, `FriendRequest/${items.friendReqKey}`);
    remove(friendReqDbRef);
    toast.success(`You Canceled ${items.SenderName} friend Request`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Slide,
    });
  };

  return (
    <div>
      <div className="h-[462px] w-[427px] rounded-[20px] shadow-[0px_5px_7px_-2px_rgba(18,18,18,0.56)]">
        <div className="pt-[13px]">
          <div className="flex w-[90] items-center justify-between text-wrap text-center">
            <h3 className="pl-[20px] font-Poppins text-[20px] font-semibold text-[#000]">
              <button
                type="button"
                class="relative inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white"
              >
                Friend request
                <div class="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green-500 text-xs font-bold text-white dark:border-gray-900">
                  {friendReqList.length > 0 ? friendReqList.length : 0}
                </div>
              </button>
            </h3>
            <span>
              <HiDotsVertical className="cursor-pointer text-2xl text-ThemeColor" />
            </span>
          </div>
          {friendReqList.length > 0 ? (
            <div className="h-[415px] divide-y divide-[rgba(0,0,0,0.25)] overflow-y-scroll">
              {/* Group Section 1 */}
              {friendReqList?.map((items) => (
                <div className="flex items-center justify-between py-3.5 pl-[20px] pr-[15px] pt-[17px]">
                  <div className="flex items-center">
                    <div className="rounded-1/2 mr-[13px]">
                      <picture>
                        <img
                          src={
                            items.profile_picture
                              ? items.profile_picture
                              : Userlist1
                          }
                          alt={
                            items.profile_picture
                              ? items.profile_picture
                              : Userlist1
                          }
                          className="h-[60px] w-[60px] rounded-full"
                        />
                      </picture>
                    </div>

                    <div>
                      <h3 className="font-Poppins text-[16px] font-semibold">
                        {items.SenderName}
                      </h3>
                      <p className="font-Poppins text-[14px] font-medium text-[rgba(77,77,77,0.73)]">
                        {moment(items.createdDate).fromNow()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <button
                      className="rounded-md bg-ThemeColor px-3 py-2 text-[14px] font-bold text-white transition-all hover:bg-gradient-to-l hover:from-[#134E5E] hover:to-[#71B280]"
                      onClick={() => HandleReqAceept(items)}
                    >
                      Accept
                    </button>

                    <button
                      className="rounded-md bg-gradient-to-r from-[#ff6767] to-[#f80778] px-3 py-2 text-[14px] font-bold text-white transition-all hover:bg-gradient-to-l hover:from-[#f96363] hover:to-[#d43394]"
                      onClick={() => HandleReqCancel(items)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <h3 className="h-full pt-[50%]">No user found</h3>
            </div>
          )}
          {/* Parent with divide-y class */}
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
