import React from "react";
import SearchBar from "../Components/HomeComponents/HomePageComonCompo/Searchbar.jsx";
import GroupsList from "../Components/HomeComponents/HomePageContents/GroupList.jsx";
import Frinds from "../Components/HomeComponents/HomePageContents/Friends.jsx";
import Profilepic from "../assets/Home/Userslist/userlist1.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChatPage = () => {
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
                    src={Profilepic}
                    alt={Profilepic}
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
                  SenderName
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
          <div className="mt-6 flex h-[65vh] flex-col overflow-y-scroll px-4">
            <div>
              {/* Chat Bubble Left (Incoming Message) */}
              <div className="flex items-start">
                <div className="max-w-[75%] rounded-lg bg-blue-400 p-3 text-white shadow-md">
                  <p>
                    It's over Anakin, I have the high ground. Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Quod, at deserunt
                    reprehenderit delectus maxime nihil non recusandae impedit
                    unde aut dolorem autem nisi ut distinctio sit eos,
                    doloremque qui dignissimos.
                  </p>
                </div>
              </div>
              <div className="mt-1 text-start text-xs text-gray-500">
                <span>time</span>
              </div>
            </div>

            <div className="mt-6 self-end">
              {/* Chat Bubble Right (Outgoing Message) */}
              <div className="flex items-end justify-end">
                <div className="max-w-[75%] rounded-lg bg-green-400 p-3 text-white shadow-md">
                  <p>You underestimate my power!</p>
                </div>
              </div>
              <div className="mt-1 text-end text-xs text-gray-500">
                <span>time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
