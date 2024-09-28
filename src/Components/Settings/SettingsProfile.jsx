import React from "react";
import frineds from "../../assets/Home/Userslist/userlist1.jpg";
import { getAuth } from "firebase/auth";

const SettingsProfile = ({ onusersInfo }) => {
  console.log(onusersInfo);

  const auth = getAuth();

  const UserPhoto = auth.currentUser.photoURL;
  const UserName = auth.currentUser.displayName;

  return (
    <div>
      <div className="mt-10 flex items-center gap-x-12">
        <div>
          <picture>
            <img
              src={
                onusersInfo.profile_picture
                  ? onusersInfo.profile_picture
                  : UserPhoto
              }
              alt={
                onusersInfo.profile_picture
                  ? onusersInfo.profile_picture
                  : UserPhoto
              }
              className="h-[100px] w-[100px] rounded-full border-2 border-white"
            />
          </picture>
        </div>
        <div className="">
          <h1 className="font-Poppins text-[20px] font-semibold text-black">
            {onusersInfo.displayName ? onusersInfo.displayName : UserName}
          </h1>
          <p className="font-Poppins text-[15px]">{auth.currentUser.email}</p>
        </div>
      </div>
      <hr className="mt-5" />
    </div>
  );
};

export default SettingsProfile;
