import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Userlist1 from "../../../assets/Home/Userslist/userlist1.jpg";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";
import { FaUserFriends } from "react-icons/fa";
import { toast, Slide } from "react-toastify";

const UserList = () => {
  const auth = getAuth();
  const db = getDatabase();
  // All state
  const [userlist, setuserlist] = useState([]);
  const [RecentcurrentUser, setRecentcurrentUser] = useState({});
  const [friendReqUser, setfriendReqUser] = useState([]);
  const [isfrined, setisfrined] = useState([]);
  // All state End
  // User lisr dekhabe kinto nijeke dekhabena ai kaj
  useEffect(() => {
    const userDbRef = ref(db, "users/");
    onValue(userDbRef, (snapshot) => {
      let userArrey = [];
      snapshot.forEach((items) => {
        if (items.val().uid !== auth.currentUser.uid) {
          userArrey.push({ ...items.val(), userKey: items.key });
        } else if (items.val().uid === auth.currentUser.uid) {
          setRecentcurrentUser({ ...items.val(), userKey: items.key });
        }
        // Second way
        // userArrey.push(Object.assign(items.val(), { userKey: items.key }));
      });
      setuserlist(userArrey);
    });
  }, [db]);
  // User lisr dekhabe kinto nijeke dekhabena ai kaj End

  /**
   * todo: Timezone handle
   * @params ({})
   **/

  const HandleFriendRequest = (items) => {
    set(push(ref(db, "FriendRequest/")), {
      senderUid: auth.currentUser.uid,
      senderemail: auth.currentUser.email,
      SenderName: auth.currentUser.displayName,
      SenderUserKey: RecentcurrentUser.userKey,
      profile_picture: auth.currentUser.photoURL
        ? auth.currentUser.photoURL
        : Userlist1,
      reciverUid: items.uid,
      reciverEmail: items.email,
      reciverName: items.displayName,
      reciverUserkey: items.userKey,
      createdDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
    }).then(() => {
      toast.success(`Friend Request sent`, {
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
   * todo: Fetch data from frind request
   * @params ({})
   **/

  useEffect(() => {
    const FriendReqUserDbRef = ref(db, "FriendRequest/");
    onValue(FriendReqUserDbRef, (snapshot) => {
      let friendrequestDb = [];
      snapshot.forEach((items) => {
        friendrequestDb.push(items.val().senderUid + items.val().reciverUid);
      });
      setfriendReqUser(friendrequestDb);
    });
  }, []);

  /**
   * *There is a issue with depandancy big issue with real time update make it blank
   * */

  /**
   * todo: Fetch data from frinds and set a icon on add btn
   * @params ({})
   **/

  useEffect(() => {
    const FriendsDbRef = ref(db, "Friends/");
    onValue(FriendsDbRef, (snapshot) => {
      let friendsDbBlankArr = [];
      snapshot.forEach((items) => {
        friendsDbBlankArr.push(
          items.val().senderUid + items.val().reciverUserkey,
        );
      });
      setisfrined(friendsDbBlankArr);
    });
  }, []);

  return (
    <>
      <div className="h-[451px] w-[344px] rounded-[20px] shadow-[0px_5px_7px_-2px_rgba(18,18,18,0.56)]">
        <div className="pt-[13px]">
          <div className="flex w-[90] items-center justify-between text-wrap text-center">
            <h3 className="pl-[20px] font-Poppins text-[20px] font-semibold text-[#000]">
              <button
                type="button"
                class="relative inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white"
              >
                User List
                <div class="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green-500 text-xs font-bold text-white dark:border-gray-900">
                  {userlist.length > 0 ? userlist.length : 0}
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
            {userlist?.length > 0 ? (
              userlist.map((items) => (
                <div
                  className="flex items-center justify-between py-3.5 pl-[20px] pr-[20px] pt-[17px]"
                  key={items.id}
                >
                  <div className="flex items-center">
                    <div className="relative mr-[13px]">
                      <picture>
                        <img
                          src={
                            items.profile_picture
                              ? items.profile_picture
                              : Userlist1
                          }
                          alt=""
                          className="h-[54px] w-[52px] rounded-full"
                        />
                      </picture>
                    </div>
                    <div>
                      <h3 className="font-Poppins text-[14px] font-semibold">
                        {items.displayName}
                      </h3>
                      <p className="font-Poppins text-[12px] font-medium text-[rgba(77,77,77,0.73)]">
                        {/* {moment(items.createdDate).fromNow()} */}
                        {moment("2024-09-10T16:30:21").calendar()}
                      </p>
                    </div>
                  </div>
                  <div>
                    {isfrined.includes(auth.currentUser.uid + items.userKey) ? (
                      <button className="rounded-[5px] bg-ThemeColor px-[8px] py-[5px] font-Poppins text-[20px] font-semibold text-[#fff]">
                        <FaUserFriends className="animate-pulse" />
                      </button>
                    ) : friendReqUser.includes(
                        auth.currentUser.uid + items.uid,
                      ) ? (
                      <button className="rounded-[5px] bg-ThemeColor px-[5px] font-Poppins text-[20px] font-semibold text-[#fff]">
                        Sent
                      </button>
                    ) : (
                      <button
                        className="rounded-[5px] bg-ThemeColor px-[5px] font-Poppins text-[20px] font-semibold text-[#fff]"
                        onClick={() => HandleFriendRequest(items)}
                      >
                        Add
                      </button>
                    )}
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
    </>
  );
};

export default UserList;
