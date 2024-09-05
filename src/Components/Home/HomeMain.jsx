import React from "react";
import HomeLeft from "./HomeLeft";
import HomeRight from "./HomeRight";

const HomeMain = () => {
  return (
    <div className="flex p-[35px]">
      <HomeLeft />
      <HomeRight />
    </div>
  );
};

export default HomeMain;
