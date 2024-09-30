import React, { useState } from "react";

const EditPhoto = ({ onHandleProfilePicChange, onprogressbar }) => {
  //States
  const [CurrentImg, setCurrentImg] = useState("");

  const HandleImg = (event) => {
    const { files } = event.target;
    setCurrentImg(files[0]);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-between">
        <div className="my-10">
          <input
            type="file"
            name="profilepic"
            id="profilepic"
            className="rounded-lg"
            onChange={HandleImg}
          />
        </div>
        {onprogressbar ? (
          <div class="w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              class="rounded-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-blue-100"
              style={{ width: `${Math.ceil(onprogressbar)}%` }}
            >
              {Math.ceil(onprogressbar)}%
            </div>
          </div>
        ) : (
          <button
            className="w-full rounded-lg bg-ThemeColor px-2 py-1 font-Poppins font-bold text-white"
            onClick={() => onHandleProfilePicChange(CurrentImg)}
          >
            Upload Profile Picture
          </button>
        )}
      </div>
    </div>
  );
};

export default EditPhoto;
