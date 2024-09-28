import React from "react";
import { FaKey } from "react-icons/fa";
import { VscColorMode } from "react-icons/vsc";
import { AiFillDelete } from "react-icons/ai";

const SettingsRight = () => {
  return (
    <div>
      <div className="h-screen w-[575px] rounded-lg p-5 shadow-lg">
        <span className="text-[20px] font-semibold">Account Settings</span>
        <div>
          <div className="flex flex-col gap-y-10 p-14">
            <div className="">
              <div className="flex items-center gap-x-4">
                <span className="text-[23px]">
                  <FaKey />
                </span>
                <p className="font-Poppins text-[18px]">Change Password</p>
              </div>
            </div>
            <div className="">
              <div className="flex items-center gap-x-4">
                <span className="text-[23px]">
                  <VscColorMode />
                </span>
                <p className="font-Poppins text-[18px]">Theme.</p>
              </div>
            </div>
            <div className="">
              <div className="flex items-center gap-x-4">
                <span className="text-[23px]">
                  <AiFillDelete />
                </span>
                <p className="font-Poppins text-[18px]">Delete Account.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsRight;
