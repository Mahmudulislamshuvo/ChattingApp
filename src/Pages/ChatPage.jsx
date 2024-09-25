import React, { useEffect, useState } from "react";
import SearchBar from "../Components/HomeComponents/HomePageComonCompo/Searchbar.jsx";
import GroupsList from "../Components/HomeComponents/HomePageContents/GroupList.jsx";
import Frinds from "../Components/HomeComponents/HomePageContents/Friends.jsx";
import Profilepic from "../assets/Home/Userslist/userlist1.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { BsCamera } from "react-icons/bs";
import { useSelector } from "react-redux";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";

const ChatPage = () => {
  const db = getDatabase();
  const auth = getAuth();

  const { Users } = useSelector((state) => state.FriendsActions);
  const [textmsg, settextmsg] = useState("");
  const [singleMsg, setsingleMsg] = useState([]);

  /**
   * todo: avoid conflit Rename data got from Redux
   * */
  const whoGotTextInfo = {
    whoGotTextEmail: Users.senderemail,
    whoGotTextName: Users.SenderName,
    whoGotTextPhoto: Users.profile_picture,
    whoGotTextUid: Users.senderUid,
  };

  /**
   * todo: Handle Text
   *@params ({event})
   * */
  const HandleText = (event) => {
    const { value } = event.target;
    settextmsg(value);
  };

  /**
   * todo: Handle Sigle Msg
   * @params ({})
   * */
  const HandleSigleText = () => {
    const singletextBlankArr = [];
    settextmsg("");
    set(push(ref(db, "SingleText/")), {
      whoSendTextEmail: auth.currentUser.email,
      whoSendTextName: auth.currentUser.displayName,
      whoSendTextUid: auth.currentUser.uid,
      whoSendTextphoto: auth.currentUser.photoURL,
      whoGotMsgName: whoGotTextInfo.whoGotTextName,
      whoGotMsgEmail: whoGotTextInfo.whoGotTextEmail,
      whoGotMsgUid: whoGotTextInfo.whoGotTextUid,
      whoGotMsgPhoto: whoGotTextInfo.whoGotTextPhoto,
      Text: textmsg,
      createdDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
    });
  };

  /**
   * todo: To fetch Data from Db for Show text Messege
   * */

  useEffect(() => {
    const SingleTextDbref = ref(db, "SingleText/");
    onValue(SingleTextDbref, (snapshot) => {
      let Textmsgblankarr = [];
      snapshot.forEach((items) => {
        Textmsgblankarr.push({
          ...items.val(),
          singleTextKey: items.key,
        });
      });
      setsingleMsg(Textmsgblankarr);
    });
  }, []);

  return (
    <div className="">
      <div className="flex">
        <div className="">
          <SearchBar />
          <GroupsList />
          <Frinds ischat={true} />
        </div>
        <div className="w-[765px] pl-4">
          <div className="mx-[20px] flex items-center justify-between border-b-[2px] border-[#00000025] py-3.5 pt-[17px]">
            <div className="flex items-center">
              <div className="relative mr-[13px]">
                <picture>
                  <img
                    src={
                      Users.profile_picture ? Users.profile_picture : Profilepic
                    }
                    alt={
                      Users.profile_picture ? Users.profile_picture : Profilepic
                    }
                    className="h-[54px] w-[52px] rounded-full"
                  />
                </picture>
                {/* {items.active ? (
                  <span class="absolute bottom-1 right-1 flex h-3 w-3">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                    <span class="relative inline-flex h-3 w-3 rounded-full bg-green-600"></span>
                  </span>
                ) : (
                  <span class="absolute bottom-1 right-1 flex h-3 w-3">
                    <span class="relative inline-flex h-3 w-3 rounded-full bg-gray-500"></span>
                  </span>
                )} */}
              </div>

              <div>
                <h3 className="font-Poppins text-[22px] font-semibold">
                  {Users.SenderName ? Users.SenderName : "Mr. XYZ"}
                </h3>
                <p className="font-Poppins text-[16px] font-medium text-[rgba(77,77,77,0.73)]">
                  Online
                </p>
              </div>
            </div>
            <div className="text-center">
              <p className="pb-1 font-Poppins text-[20px] font-medium text-[rgba(0,0,0,0.51)]">
                <BsThreeDotsVertical />
              </p>
              {/* <button
                type="button"
                className="relative inline-flex items-center rounded-lg bg-gradient-to-r from-ThemeColor to-[#4a5dab] px-3 py-2 text-sm font-medium text-white"
              >
                Block
              </button> */}
            </div>
          </div>
          <div className="mb-4 mt-6 flex h-[65vh] flex-col overflow-y-scroll px-4">
            {singleMsg?.map((items) => (
              <div>
                {items.whoSendTextUid === auth.currentUser.uid ? (
                  <div className="mt-6 self-end">
                    {/* Chat Bubble Right (Outgoing Message) */}
                    <div className="flex items-end justify-end">
                      <div className="max-w-[75%] rounded-lg bg-green-400 p-3 text-white shadow-md">
                        <p>{items.Text}</p>
                      </div>
                    </div>
                    <div className="mt-1 text-end text-xs text-gray-500">
                      <span>{moment(items.createdDate).fromNow()}</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Chat Bubble Left (Incoming Message) */}
                    <div className="flex items-start">
                      <div className="max-w-[75%] rounded-lg bg-blue-400 p-3 text-white shadow-md">
                        <p>{items.Text}</p>
                      </div>
                    </div>
                    <div className="mt-1 text-start text-xs text-gray-500">
                      <span>{moment(items.createdDate).fromNow()}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* <hr />
          <div className="flex items-center justify-between text-center">
            <div className="relative">
              <input
                type="text "
                className="mt-4 w-[690px] rounded-xl bg-[#F1F1F1] px-3 py-3"
                placeholder="Write here...."
              />
              <div className="absolute right-4 top-6 flex items-center justify-center gap-x-3 text-[30px]">
                <MdOutlineEmojiEmotions />
                <BsCamera />
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-ThemeColor px-3 py-2 text-[30px] text-white">
              <IoIosSend />
            </div>
          </div> */}
          <hr className="fixed bottom-[90px] right-4 w-[50%] border-ThemeColor" />
          <div className="fixed bottom-0 right-0 flex w-[52%] items-center justify-between bg-white p-4">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full rounded-xl bg-[#F1F1F1] px-3 py-3"
                placeholder="Write here...."
                onChange={HandleText}
                value={textmsg}
                onKeyDown={(event) =>
                  event.key === "Enter" && HandleSigleText()
                }
              />
              <div className="absolute right-4 top-1/2 flex -translate-y-1/2 transform items-center justify-center gap-x-3 text-[30px]">
                <MdOutlineEmojiEmotions />
                <BsCamera />
              </div>
            </div>

            <div
              className="ml-4 rounded-xl bg-ThemeColor px-3 py-2 text-[30px] text-white"
              onClick={HandleSigleText}
            >
              <IoIosSend />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
