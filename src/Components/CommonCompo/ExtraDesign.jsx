import React from "react";
import {
  FaHome,
  FaComments,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Extra = () => {
  return (
    <div>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="bg-purple-600 text-white w-1/5 p-5 flex flex-col items-center">
          <img
            src="https://via.placeholder.com/150" // Replace with your image URL
            alt="User"
            className="rounded-full w-16 mb-4"
          />
          {/* <div className="flex relative">
              <div className="text-ThemeColor bg-[#fff] pl-[45px] pr-[50px] py-[23px] text-center ml-[20px] rounded-tl-[20px] rounded-bl-[20px]">
                <FaHome className=" text-[45px] " />
              </div>
              <div className="pl-[45px] pr-[69px] h-full bg-ThemeColor rounded-lg absolute top-0 right-[-105px]"></div>
            </div>
            <div className=" ">
              <FaComments className="text-[45px]" />
            </div>
            <div>
              <FaBell className=" text-[45px]" />
            </div>
            <div>
              <FaCog className=" text-[45px]" />
            </div>
            <div className="mt-[187px]">
              <FaSignOutAlt className=" text-[45px]" />
            </div> */}
          <nav className="flex flex-col space-y-6">
            <FaHome className="text-2xl" />
            <FaComments className="text-2xl" />
            <FaBell className="text-2xl" />
            <FaCog className="text-2xl" />
            <FaSignOutAlt className="text-2xl" />
          </nav>
        </div>

        {/* Main Content */}
        <div className="bg-gray-100 w-4/5 p-6">
          {/* Top Section */}
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search"
              className="p-2 w-1/2 rounded-md"
            />
            <button className="p-2 bg-purple-600 text-white rounded-full">
              •••
            </button>
          </div>

          {/* Groups List */}
          <div className="grid grid-cols-3 gap-6">
            {/* Groups */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-4">Groups List</h3>
              {["Friends Reunion", "Friends Forever", "Crazy Cousins"].map(
                (group, idx) => (
                  <div key={idx} className="flex justify-between mb-4">
                    <div>
                      <p className="font-bold">{group}</p>
                      <p className="text-sm text-gray-500">Hi Guys, Wassup!</p>
                    </div>
                    <button className="bg-purple-600 text-white px-4 py-1 rounded-full">
                      Join
                    </button>
                  </div>
                )
              )}
            </div>

            {/* Friends */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-4">Friends</h3>
              {["Raghav", "Swathi", "Kiran", "Tejeshwini C"].map(
                (friend, idx) => (
                  <div key={idx} className="flex justify-between mb-4">
                    <div>
                      <p className="font-bold">{friend}</p>
                      <p className="text-sm text-gray-500">Dinner?</p>
                    </div>
                    <p className="text-sm text-gray-400">Today, 8:56pm</p>
                  </div>
                )
              )}
            </div>

            {/* User List */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-4">User List</h3>
              {[
                "Raghav",
                "Swathi",
                "Kiran",
                "Tejeshwini C",
                "Marvin McKinney",
              ].map((user, idx) => (
                <div key={idx} className="flex justify-between mb-4">
                  <div>
                    <p className="font-bold">{user}</p>
                  </div>
                  <button className="bg-purple-600 text-white px-4 py-1 rounded-full">
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            {/* Friend Request */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-4">Friend Request</h3>
              {["Raghav", "Swathi", "Kiran", "Tejeshwini C"].map(
                (request, idx) => (
                  <div key={idx} className="flex justify-between mb-4">
                    <div>
                      <p className="font-bold">{request}</p>
                      <p className="text-sm text-gray-500">Dinner?</p>
                    </div>
                    <button className="bg-purple-600 text-white px-4 py-1 rounded-full">
                      Accept
                    </button>
                  </div>
                )
              )}
            </div>

            {/* My Groups */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-4">My Groups</h3>
              {["Raghav", "Swathi", "Kiran", "Tejeshwini C"].map(
                (group, idx) => (
                  <div key={idx} className="flex justify-between mb-4">
                    <div>
                      <p className="font-bold">{group}</p>
                      <p className="text-sm text-gray-500">Dinner?</p>
                    </div>
                    <p className="text-sm text-gray-400">Today, 8:56pm</p>
                  </div>
                )
              )}
            </div>

            {/* Blocked Users */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-4">Blocked Users</h3>
              {["Raghav", "Swathi", "Kiran", "Tejeshwini C", "Marvin"].map(
                (blocked, idx) => (
                  <div key={idx} className="flex justify-between mb-4">
                    <div>
                      <p className="font-bold">{blocked}</p>
                    </div>
                    <button className="bg-purple-600 text-white px-4 py-1 rounded-full">
                      Unblock.
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Extra;
