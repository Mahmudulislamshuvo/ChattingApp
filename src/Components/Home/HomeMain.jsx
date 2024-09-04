import React from "react";
import HomeLeft from "./HomeLeft";
import HomeRight from "./HomeRight";

const HomeMain = () => {
  return (
    <div className="flex">
      <HomeLeft active={"home"} />
      <HomeRight />
    </div>
  );
};

export default HomeMain;
