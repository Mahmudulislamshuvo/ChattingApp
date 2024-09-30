import React, { useEffect, useState } from "react";
import SettingsProfile from "./SettingsProfile";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoMdText } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoHelpCircleOutline } from "react-icons/io5";
import SettingsModal from "./SettingsCommon/SettingsModal";
import EditProfileName from "./UpatingCompo/EditProfileName";
import { getDatabase, ref, onValue, push, update } from "firebase/database";
import { getAuth, updateProfile } from "firebase/auth";
import EditPhoto from "./UpatingCompo/EditPhoto";
import {
  getStorage,
  ref as stgRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const SettingLeft = () => {
  const auth = getAuth();
  const db = getDatabase();
  const storage = getStorage();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [UserNameInput, setUserNameInput] = useState("");
  const [currentUser, setcurrentUser] = useState({});
  const [updatepp, setupdatepp] = useState("");
  const [progressbar, setprogressbar] = useState(0);

  // Modal functions
  function openModal(UpdateProfilePic) {
    setupdatepp(UpdateProfilePic);
    setIsOpen(true);
    setUserNameInput("");
  }

  function closeModal() {
    setIsOpen(false);
  }
  //    Modal functions end
  /**
   * todo: get users here
   * */
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

  /**
   * todo: Handle Profile Name Update
   * @perams ({user_Id})
   * */

  const HandleUserNameChange = async () => {
    try {
      if (!UserNameInput) {
        alert("UserName Missing");
      } else {
        const CurrentUserDbRef = ref(db, `users/${currentUser.userKey}`);
        await update(CurrentUserDbRef, {
          displayName: UserNameInput,
        });
        await updateProfile(auth.currentUser, {
          displayName: UserNameInput,
        });
        await auth.currentUser.reload();
        console.log("UserName updated successfully!");
      }
    } catch (error) {
      console.warn("Error updating username:", error);
    } finally {
      closeModal();
    }
  };

  /**
   * todo: Update User Info input
   * @perams ({})
   * */
  const UpdateUserInfo = (e) => {
    setUserNameInput(e.target.value);
  };

  /**
   * todo: Handle Profile Pic change fictionality Implementation
   *@perams ({})
   * */
  const HandleProfilePicChange = (updatedImg) => {
    if (!updatedImg) {
      alert("Please upload an image before submitting.");
      return;
    }
    const storageRef = stgRef(storage, `UpadtedProfilePic/Image${uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, updatedImg);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progressbar =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setprogressbar(progressbar);
      },
      (error) => {
        console.log("Error", error.code);
      },
      () => {
        setprogressbar("");
        closeModal();
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          const UsersRef = ref(db, `users/${currentUser.userKey}`);
          update(UsersRef, {
            profile_picture: downloadURL,
          });
        });
      },
    );
  };

  return (
    <>
      <div className="h-screen w-[575px] rounded-lg p-5 shadow-lg">
        <span className="text-[20px] font-semibold">Profile Settings</span>
        <div>
          <SettingsProfile />
        </div>
        <div className="flex flex-col gap-y-10 p-14">
          <div onClick={() => openModal("")}>
            <div className="flex cursor-pointer items-center gap-x-4">
              <span className="text-[23px]">
                <BiSolidEditAlt />
              </span>
              <p className="font-Poppins text-[18px]">Edit Profile Name.</p>
            </div>
          </div>
          <div>
            <div className="flex cursor-pointer items-center gap-x-4">
              <span className="text-[23px]">
                <IoMdText />
              </span>
              <p className="font-Poppins text-[18px]">
                Edit Profile Status Info.
              </p>
            </div>
          </div>
          <div onClick={() => openModal("UpdateProfilePic")}>
            <div className="flex cursor-pointer items-center gap-x-4">
              <span className="text-[23px]">
                <MdAddPhotoAlternate />
              </span>
              <p className="font-Poppins text-[18px]">Edit Profile Photo.</p>
            </div>
          </div>
          <div>
            <div className="flex cursor-pointer items-center gap-x-4">
              <span className="text-[23px]">
                <IoHelpCircleOutline />
              </span>
              <p className="font-Poppins text-[18px]">Help.</p>
            </div>
          </div>
        </div>
        <SettingsModal onModal={modalIsOpen} offcloseModal={closeModal}>
          {updatepp !== "" ? (
            <EditPhoto
              onHandleProfilePicChange={HandleProfilePicChange}
              onprogressbar={progressbar}
            />
          ) : (
            <EditProfileName
              OnUpdateUserProfile={HandleUserNameChange}
              OnUpdateUserInfo={UpdateUserInfo}
              OnUserNameInput={UserNameInput}
            />
          )}
        </SettingsModal>
      </div>
    </>
  );
};

export default SettingLeft;
