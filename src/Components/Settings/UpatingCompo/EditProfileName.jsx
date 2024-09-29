import React, { useState } from "react";
import { getAuth } from "firebase/auth";

const EditProfileName = ({
  OnUpdateUserProfile,
  OnUpdateUserInfo,
  OnUserNameInput,
}) => {
  const [IsFocus, setIsFocus] = useState(false);
  const [loading, setloading] = useState(false);

  /**
   * todo: Input feild clear on focus
   * */
  const HandleFocus = () => {
    setIsFocus(true);
  };
  console.log("Isfocus", IsFocus);

  const auth = getAuth();
  return (
    <div>
      <div className="mt-5">
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <label
            htmlFor="ProfileName"
            className="block font-Poppins font-semibold"
          >
            Input Your Full Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="ProfileName"
            name="ProfileName"
            className="mb-5 mt-2 w-full rounded-lg px-4 py-2 font-Poppins"
            onChange={OnUpdateUserInfo}
            value={
              IsFocus
                ? OnUserNameInput
                : OnUserNameInput || auth.currentUser.displayName
            }
            onFocus={HandleFocus}
          />
          <input
            type="submit"
            className="relative m-auto block w-1/2 cursor-pointer rounded-md bg-ThemeColor py-2 font-semibold text-white"
            onClick={OnUpdateUserProfile}
          />
        </form>
      </div>
    </div>
  );
};

export default EditProfileName;
