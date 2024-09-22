import React from "react";
import Searchbar from "../Components/HomeComponents/HomePageComonCompo/Searchbar";
import Notification from "../Components/NotificationCompo/Notification";

const NotificationPage = () => {
  return (
    <div>
      <Searchbar className="SearchbarCustomCss w-full" />
      <div className="mt-5 w-[1190px]">
        <Notification className="w-full" />
      </div>
    </div>
  );
};

export default NotificationPage;
