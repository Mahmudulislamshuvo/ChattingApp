import React from "react";
import GroupList from "../Components/HomeComponents/HomePageContents/GroupList";
import Friends from "../Components/HomeComponents/HomePageContents/Friends";
import UserList from "../Components/HomeComponents/HomePageContents/UserList";
import FriendRequest from "../Components/HomeComponents/HomePageContents/FriendRequest";
import MyGroups from "../Components/HomeComponents/HomePageContents/MyGroups";
import BlockUsers from "../Components/HomeComponents/HomePageContents/BlockUsers";
import Searchbar from "../Components/HomeComponents/HomePageComonCompo/Searchbar.jsx";

const HomeContects = () => {
  return (
    <div className="">
      <div className="mb-[20px]">
        <Searchbar className="w-full" />
      </div>
      <div className="flex gap-x-9">
        <GroupList />
        <Friends />
        <UserList />
      </div>
      <div className="mt-[40px] flex gap-x-9">
        <FriendRequest />
        <MyGroups />
        <BlockUsers />
      </div>
    </div>
  );
};

export default HomeContects;
