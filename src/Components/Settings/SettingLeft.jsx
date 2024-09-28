import React, { useEffect, useState } from "react";
import SettingsProfile from "./SettingsProfile";
import { BiSolidEditAlt } from "react-icons/bi";
import { IoMdText } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoHelpCircleOutline } from "react-icons/io5";
import SettingsModal from "./SettingsCommon/SettingsModal";
import EditProfileName from "./UpatingCompo/EditProfileName";
import { getDatabase, ref, onValue, push, update } from "firebase/database";
import { getAuth } from "firebase/auth";

const SettingLeft = () => {
  const auth = getAuth();
  const db = getDatabase();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [UserNameInput, setUserNameInput] = useState("");
  const [currentUser, setcurrentUser] = useState({});

  // Modal functions
  function openModal() {
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

  return (
    <>
      <div className="h-screen w-[575px] rounded-lg p-5 shadow-lg">
        <span className="text-[20px] font-semibold">Profile Settings</span>
        <div>
          <SettingsProfile onusersInfo={currentUser} />
        </div>
        <div className="flex flex-col gap-y-10 p-14">
          <div onClick={openModal}>
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
          <div>
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
          <EditProfileName
            OnUpdateUserProfile={HandleUserNameChange}
            OnUpdateUserInfo={UpdateUserInfo}
            OnUserNameInput={UserNameInput}
          />
        </SettingsModal>
      </div>
    </>
  );
};

export default SettingLeft;
