import React, { useEffect, useState } from "react";
import frineds from "../../assets/Home/Userslist/userlist1.jpg";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, push, update } from "firebase/database";

const SettingsProfile = () => {
  const auth = getAuth();
  const db = getDatabase();

  const [currentUser, setcurrentUser] = useState({});
  console.log(currentUser);

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((items) => {
        if (auth.currentUser.uid === items.val().uid) {
          setcurrentUser({ ...items.val(), userKey: items.key });
        }
      });
    });
  }, []);

  return (
    <div>
      <div className="mt-10 flex items-center gap-x-12">
        <div>
          <picture>
            <img
              src={currentUser.profile_picture}
              alt={currentUser.profile_picture}
              className="h-[100px] w-[100px] rounded-full border-2 border-white"
            />
          </picture>
        </div>
        <div className="">
          <h1 className="font-Poppins text-[20px] font-semibold text-black">
            {currentUser.displayName}
          </h1>
          <p className="font-Poppins text-[15px]">{currentUser.email}</p>
        </div>
      </div>
      <hr className="mt-5" />
    </div>
  );
};

export default SettingsProfile;
