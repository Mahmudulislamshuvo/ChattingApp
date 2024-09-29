import React, { useState, createRef, useEffect } from "react";
import HomeContentOne from "../../../assets/Home/one.png";
import { IoClose } from "react-icons/io5";
import ReactDOM from "react-dom";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "80%",
    width: "40%",
  },
};
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { firetoastsuccess, firetoasterror } from "../../../Helper/Utils";
import {
  getStorage,
  ref as dbref,
  uploadBytesResumable,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import moment from "moment";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const GroupList = () => {
  const db = getDatabase();
  const auth = getAuth();
  const storage = getStorage();
  // Cropper States
  const [image, setImage] = useState(defaultSrc);
  const cropperRef = createRef();
  // Cropper State
  // Copper things
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  // Copper things end

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setGroupinfo({
        groupName: "",
        groupTagName: "",
      });
    }
  };

  // Copper things end

  // Modal codes start
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleopenModal = () => {
    openModal();
  };
  // Modal codes end
  /**
   * *All My States Start
   * */
  const [Groupinfo, setGroupinfo] = useState({
    groupName: "",
    groupTagName: "",
  });
  const [inputErr, setinputErr] = useState({
    groupNameError: "",
    groupTagNameError: "",
  });
  const [loading, setloading] = useState(false);
  const [AllgroupList, setAllgroupList] = useState([]);
  const [GroupData, setGroupData] = useState([]);
  /**
   * *All My States End
   * */

  /**
   * todo: fetch data from db and show on GroupList
   * @perams ({})
   * */
  useEffect(() => {
    const GroupsDbRef = ref(db, "GroupList/");
    onValue(GroupsDbRef, (snapshot) => {
      let groupsBalnkArr = [];
      snapshot.forEach((items) => {
        groupsBalnkArr.push({
          ...items.val(),
          GroupKey: items.key,
        });
      });
      setAllgroupList(groupsBalnkArr);
    });
  }, []);

  /**
   * todo: Handle Create Group Button
   * @params ({})
   * */
  const HandleCreateGroupBtn = () => {
    const { groupName, groupTagName } = Groupinfo;
    let errors = {};
    if (!groupName) {
      errors.groupNameError = "Group Name is required!";
    }
    if (!groupTagName) {
      errors.groupTagNameError = "Group Tag Name is required!";
    }
    setinputErr(errors);
    // If no errors, proceed further (e.g., send data)
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted successfully");
    }
    setloading(true);
    const storageRef = dbref(storage, `GroupList/Imege${uuidv4()}`);
    const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
    uploadString(storageRef, message4, "data_url")
      .then((snapshot) => {
        console.log("Uploaded a data_url string!", snapshot);
      })
      .then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("File available at", downloadURL);
          set(push(ref(db, "GroupList/")), {
            GroupName: groupName,
            GroupTagName: groupTagName,
            GroupPhoto: downloadURL,
            AdminName: auth.currentUser.displayName,
            AdminEmail: auth.currentUser.email,
            AdminPhoto: auth.currentUser.photoURL,
            AdminUid: auth.currentUser.uid,
            createdDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
          });
        });
      })
      .then(() => {
        firetoastsuccess("Group Ceate Succesfull", "top-right", 4000);
        setloading(false);
      })
      .finally(() => {
        setGroupinfo({
          groupName: "",
          groupTagName: "",
        });
        setImage("");
        closeModal();
      })
      .catch((err) => {
        firetoasterror(err.message, "top-right", 4000);
      });
  };

  /**
   * todo: Handle Group Create Inputs
   * @params ({event})
   * */
  const HandleInput = (event) => {
    const { id, value } = event.target;
    setGroupinfo({
      ...Groupinfo,
      [id]: value,
    });
    // Clear error dynamically when input is valid
    setinputErr({
      ...inputErr,
      [`${id}Error`]: value ? "" : inputErr[`${id}Error`], // Clear error if value exists
    });
  };

  /**
   * todo: Grouplist join Handle Send request to Group for join
   * @params ({items})
   * */
  const HandleJoin = (items) => {
    console.log(items);
    set(push(ref(db, "GroupRequest/")), {
      ...items,
      whoJoiningUid: auth.currentUser.uid,
      whojoiningName: auth.currentUser.displayName,
      whojoiningPhoto: auth.currentUser.photoURL,
      createdDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
    })
      .then(() => {
        firetoastsuccess(`Request Sent to ${items.GroupName}`);
      })
      .then(() => {
        set(push(ref(db, "Notifications/")), {
          notificationName: items.GroupName,
          notificationPhoto: items.GroupPhoto,
          notificationMsg: `You Requested to join ${items.GroupName}`,
          createdDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
          reciverUid: items.AdminUid,
        });
      });
  };

  useEffect(() => {
    const GroupsListDbRef = ref(db, "GroupRequest/");
    onValue(GroupsListDbRef, (snapshot) => {
      let groupsBalnkArr = [];
      snapshot.forEach((items) => {
        if (items.val().whoJoiningUid === auth.currentUser.uid) {
          groupsBalnkArr.push(items.val().whoJoiningUid + items.val().GroupKey);
        }
      });
      setGroupData(groupsBalnkArr);
    });
  }, [auth.currentUser.uid, db]);

  return (
    <div className="max-h-[450px] w-[427px] rounded-[20px] shadow-[0px_5px_7px_-2px_rgba(18,18,18,0.56)]">
      <div className="pt-[13px]">
        <div className="flex w-[90] items-center justify-between text-wrap text-center">
          <h3 className="pl-[20px] font-Poppins text-[20px] font-semibold text-[#000]">
            <button
              type="button"
              class="relative inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white"
            >
              Groups List
              <div class="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green-500 text-xs font-bold text-white dark:border-gray-900">
                {AllgroupList.length > 0 ? AllgroupList.length : 0}
              </div>
            </button>
          </h3>
          <button
            onClick={handleopenModal}
            type="button"
            className="rounded-lg bg-gradient-to-r from-ThemeColor to-[#4a5dab] px-3 py-2 text-center text-sm font-medium text-white"
          >
            Create Group
          </button>
          {/* <span>
            <HiDotsVertical className="cursor-pointer text-2xl text-ThemeColor" />
          </span> */}
        </div>

        {/* Parent with divide-y class */}
        <div className="h-[400px] divide-y divide-[rgba(0,0,0,0.25)] overflow-y-scroll">
          {/* Group Section 1 */}
          {AllgroupList.length > 0 ? (
            AllgroupList?.map((items) => (
              <div className="flex items-center justify-between py-3.5 pl-[20px] pr-[20px] pt-[17px]">
                <div className="flex items-center">
                  <div className="relative mr-[13px]">
                    <picture>
                      <img
                        src={
                          items.GroupPhoto ? items.GroupPhoto : HomeContentOne
                        }
                        alt={
                          items.GroupPhoto ? items.GroupPhoto : HomeContentOne
                        }
                        className="h-[60px] w-[60px] rounded-full"
                      />
                    </picture>
                  </div>

                  <div>
                    <h3 className="font-Poppins text-[18px] font-semibold">
                      {items.GroupName}
                    </h3>
                    <p className="font-Poppins text-[14px] font-medium text-[rgba(77,77,77,0.73)]">
                      {items.GroupTagName}
                    </p>
                  </div>
                </div>

                <button
                  className="rounded-[5px] bg-ThemeColor px-[14px] py-[1px] font-Poppins text-[18px] font-semibold text-[#fff]"
                  onClick={() => HandleJoin(items)}
                >
                  {GroupData.includes(auth.currentUser.uid + items.GroupKey)
                    ? "Pending"
                    : "Join"}
                </button>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center">
              <h3 className="h-full pt-[50%]">No user found</h3>
            </div>
          )}
        </div>
      </div>
      {/* Modal Start */}
      {
        <div>
          <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <button
              onClick={closeModal}
              className="mb-2 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-black text-[35px] text-white"
            >
              <IoClose />
            </button>
            <h2 className="font-open mb-3 text-center text-[25px] font-semibold">
              Group Information
            </h2>
            <form action="#" onSubmit={(e) => e.preventDefault()}>
              {/* =========== group name input =============== */}

              <div className="mb-7">
                <label
                  htmlFor="groupName"
                  className="text-darkBlue mb-2 flex text-[20px] font-semibold capitalize"
                >
                  Group name <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Group Name"
                  id="groupName"
                  name="groupName"
                  autoComplete="off"
                  value={Groupinfo.groupName}
                  className="border-darkBlue w-full rounded-md border-2 border-opacity-30 px-[20px] py-[15px] text-[15px] focus:outline-none"
                  onChange={HandleInput}
                />
                {inputErr.groupNameError && (
                  <span className="ms-2 mt-2 inline-block font-Nunito font-semibold text-red-500">
                    {inputErr.groupNameError}
                  </span>
                )}
              </div>
              {/* =========== group tag name input =============== */}

              <div className="mb-7">
                <label
                  htmlFor="groupTagName"
                  className="text-darkBlue mb-2 flex text-[20px] font-semibold capitalize"
                >
                  Group Tagname <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Group TagName"
                  id="groupTagName"
                  name="groupTagName"
                  value={Groupinfo.groupTagName}
                  autoComplete="off"
                  className="border-darkBlue w-full rounded-md border-2 border-opacity-30 px-[20px] py-[15px] text-[15px] focus:outline-none"
                  onChange={HandleInput}
                />
                {inputErr.groupTagNameError && (
                  <span className="ms-2 mt-2 inline-block font-Nunito font-semibold text-red-500">
                    {inputErr.groupTagNameError}
                  </span>
                )}
              </div>
              {/* =========== image croper input =============== */}
              <div className="flex justify-between">
                <div className="w-[40%]">
                  <input
                    id="GroupPhoto"
                    name="GroupPhoto"
                    type="file"
                    onChange={onChange}
                  />
                </div>
                <div className="flex w-[44%] justify-between">
                  <h3 className="font-open font-semibold capitalize">
                    Image preview
                  </h3>
                  <button
                    className="relative inline-flex items-center rounded-lg bg-ThemeColor px-3 py-1 text-center text-[17px] font-medium text-white"
                    onClick={getCropData}
                  >
                    Crop Image
                  </button>
                </div>
              </div>
              <div className="flex h-[220px] w-full items-center justify-between">
                <div className="w-[44%]">
                  <Cropper
                    ref={cropperRef}
                    style={{ width: "100%", height: "200px" }}
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1.6}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    guides={true}
                  />
                </div>

                <div className="w-[44%]">
                  <div className="box h-[200px] w-full overflow-hidden bg-[rgba(0,0,0,0.4)]">
                    <div
                      className="img-preview block overflow-hidden"
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="font-nunito relative w-full rounded-lg bg-ThemeColor py-4 text-center text-[20px] text-base font-semibold capitalize text-white"
                onClick={HandleCreateGroupBtn}
              >
                {loading ? "Loading...." : "Creat group"}
              </button>
            </form>
          </Modal>
        </div>
      }
      {/* Modal End */}
    </div>
  );
};

export default GroupList;
