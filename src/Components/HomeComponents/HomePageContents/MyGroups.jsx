import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Friend from "../../../assets/Home/friend1.gif";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import moment from "moment";
import { getAuth } from "firebase/auth";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { firetoasterror, firetoastsuccess } from "../../../Helper/Utils";

/**
 * todo: Modal import and Common css
 * */
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "80vh", // Set maximum height of modal
    overflowY: "auto", // Enable vertical scrolling
    padding: "20px", // Optional: Adds some padding inside the modal
    width: "40%",
  },
};

const MyGroups = () => {
  const auth = getAuth();
  const db = getDatabase();

  // All State
  const [myGroup, setmyGroup] = useState([]);
  const [groupReq, setgroupReq] = useState([]);
  const [GroupRequestItem, setGroupRequestItem] = useState([]);

  /**
   * *Modal functions
   * */
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(groupKey) {
    setIsOpen(true);
    const GroupsRequestDbRef = ref(db, "GroupRequest/");
    onValue(GroupsRequestDbRef, (snapshot) => {
      let groupReqItemsBlankArr = [];
      snapshot.forEach((items) => {
        if (items.val().GroupKey === groupKey) {
          groupReqItemsBlankArr.push({
            ...items.val(),
            GroupRequestKey: items.key,
          });
        }
      });
      setGroupRequestItem(groupReqItemsBlankArr);
    });
  }

  function closeModal() {
    setIsOpen(false);
  }

  // Modal fucntions end

  /**
   * todo: fetch Data from Grouplist, and show group list in owner Mygroup only
   * @perams({})
   * */
  useEffect(() => {
    const GroupsDbRef = ref(db, "GroupList/");
    onValue(GroupsDbRef, (snapshot) => {
      let groupsBalnkArr = [];
      snapshot.forEach((items) => {
        if (items.val().AdminUid === auth.currentUser.uid) {
          groupsBalnkArr.push({
            ...items.val(),
            GroupKey: items.key,
          });
        }
      });
      setmyGroup(groupsBalnkArr);
    });
  }, [auth.currentUser.uid, db]);

  /**
   * todo: fetch data from db and show Group Request Accept/Reject
   * @perams ({})
   * */
  useEffect(() => {
    const GroupsReqDbRef = ref(db, "GroupRequest/");
    onValue(GroupsReqDbRef, (snapshot) => {
      let groupsReqBalnkArr = [];
      snapshot.forEach((items) => {
        if (items.val().AdminUid === auth.currentUser.uid) {
          groupsReqBalnkArr.push(items.val().AdminUid + items.val().GroupKey);
        }
      });
      setgroupReq(groupsReqBalnkArr);
    });
  }, [auth.currentUser.uid, db]);

  /**
   * todo: Handle Group Req Rejeect button with send some data to notifications
   * @params ({item})
   * */
  const GroupReqReject = (items) => {
    remove(ref(db, "GroupRequest/" + items.GroupRequestKey), {}).then(() => {
      set(push(ref(db, "Notifications/")), {
        notificationName: items.GroupName,
        notificationPhoto: items.GroupPhoto,
        notificationMsg: `${items.GroupName} Rejected your Request`,
        createdDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
        groupMemberUid: items.whoJoiningUid,
      }).then(() => {
        firetoasterror(`Decline ${items.whojoiningName} Request`);
      });
    });
    // From ChatGtp worked well
    let updatedGroupRequestItem = GroupRequestItem.filter(
      (request) => request.GroupRequestKey !== items.GroupRequestKey,
    );
    setGroupRequestItem(updatedGroupRequestItem);
    if (updatedGroupRequestItem.length === 0) {
      closeModal();
    }
  };

  /**
   * todo: group Request Accept Functionality
   * @params ({item})
   * */

  const GroupReqAccept = (items) => {
    set(push(ref(db, "GroupMembers/")), {
      adminUid: items.AdminUid,
      adminName: items.AdminName,
      adminEmail: items.AdminEmail,
      groupKey: items.GroupKey,
      groupPhoto: items.GroupPhoto,
      groupTegName: items.GroupTagName,
      groupMemberName: items.whojoiningName,
      groupMemberUid: items.whoJoiningUid,
      groupMemberPhoto: items.whojoiningPhoto,
      createdDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
    }).then(() => {
      firetoastsuccess(`You accepted ${items.whojoiningName}`);
      set(push(ref(db, "Notifications/")), {
        notificationName: items.GroupName,
        notificationPhoto: items.GroupPhoto,
        groupMemberUid: items.whoJoiningUid,
        notificationMsg: `${items.GroupName} Accepted your Request`,
        createdDate: moment().format("MM/DD/YYYY, h:mm:ss a"),
      }).then(() => {
        remove(ref(db, "GroupRequest/" + items.GroupRequestKey), {});
        // closeModal();
      });
    });
  };

  return (
    <>
      <div className="h-[462px] w-[344px] rounded-[20px] shadow-[0px_5px_7px_-2px_rgba(18,18,18,0.56)]">
        <div className="pt-[13px]">
          <div className="flex w-[90] items-center justify-between text-wrap text-center">
            <h3 className="pl-[20px] font-Poppins text-[20px] font-semibold text-[#000]">
              <button
                type="button"
                class="relative inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white"
              >
                My Groups
                <div class="absolute -end-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green-500 text-xs font-bold text-white dark:border-gray-900">
                  {myGroup.length > 0 ? myGroup.length : 0}
                </div>
              </button>
            </h3>

            <span>
              <HiDotsVertical className="cursor-pointer text-2xl text-ThemeColor" />
            </span>
          </div>

          {/* Parent with divide-y class */}
          <div className="h-[403px] divide-y divide-[rgba(0,0,0,0.25)] overflow-y-scroll">
            {/* Group Section 1 */}
            {myGroup.length > 0 ? (
              myGroup?.map((items) => (
                <div className="flex items-center justify-between py-3.5 pl-[20px] pr-[20px] pt-[17px]">
                  <div className="flex items-center">
                    <div className="relative mr-[13px]">
                      <picture>
                        <img
                          src={items.GroupPhoto ? items.GroupPhoto : Friend}
                          alt={items.GroupPhoto ? items.GroupPhoto : Friend}
                          className="h-[54px] w-[52px] rounded-full"
                        />
                      </picture>
                      {items.active ? (
                        <span class="absolute bottom-1 right-1 flex h-3 w-3">
                          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                          <span class="relative inline-flex h-3 w-3 rounded-full bg-green-600"></span>
                        </span>
                      ) : (
                        <span class="absolute bottom-1 right-1 flex h-3 w-3">
                          <span class="relative inline-flex h-3 w-3 rounded-full bg-gray-500"></span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-Poppins text-[14px] font-semibold">
                        {items.GroupName}
                      </h3>
                      <p className="font-Poppins text-[12px] font-medium text-[rgba(77,77,77,0.73)]">
                        {items.GroupTagName}
                      </p>
                    </div>
                  </div>
                  <div>
                    {groupReq.includes(
                      auth.currentUser.uid + items.GroupKey,
                    ) ? (
                      <div className="flex flex-col items-center gap-y-1">
                        <button
                          className="rounded-md bg-gradient-to-r from-[#3759ec] to-[#6305bb] px-1 py-0.5 text-[16px] font-semibold text-white"
                          onClick={() => openModal(items.GroupKey)}
                        >
                          See Requests
                        </button>
                        <p className="font-Poppins text-[10px] font-medium text-[rgba(0,0,0,0.51)]">
                          {moment(items.createdDate).fromNow()}
                        </p>
                      </div>
                    ) : (
                      <p className="font-Poppins text-[10px] font-medium text-[rgba(0,0,0,0.51)]">
                        {moment(items.createdDate).fromNow()}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center">
                <h3 className="h-full pt-[50%]">No Group found</h3>
              </div>
            )}
          </div>
        </div>
        {/* Modal codes start */}
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <button
              onClick={closeModal}
              className="mb-2 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-black text-[35px] text-white"
            >
              <IoClose />
            </button>
            <hr className="mb-4" />
            <div>
              {GroupRequestItem?.map((item) => (
                <>
                  <div className="flex flex-col items-center justify-between px-7 py-5">
                    <div className="relative h-[70px] w-[70px] cursor-pointer rounded-full bg-blue-200">
                      {item.whojoiningPhoto ? (
                        <picture>
                          <img
                            className="h-[70px] w-[70px] rounded-full object-cover shadow-lg"
                            src={item.whojoiningPhoto}
                            alt={item.whojoiningPhoto}
                          />
                        </picture>
                      ) : (
                        <picture>
                          <img
                            src={Friend}
                            alt={Friend}
                            className="h-[70px] w-[70px] rounded-full object-cover shadow-lg"
                          />
                        </picture>
                      )}
                    </div>

                    <div className="flex w-[95%] flex-col items-center justify-center text-wrap">
                      <h1 className="text-custom-black font-Poppins text-xl font-semibold">
                        {item.whojoiningName
                          ? `${
                              item.whojoiningName
                            } Wants to join ${item.GroupName}`
                          : "Name Xyz"}
                      </h1>
                      <h4>{moment(item.createdDate).fromNow()}</h4>
                    </div>
                  </div>
                  <hr className="mb-4 mt-3" />
                  <div
                    className="flex items-center justify-between px-7 py-5"
                    key={item.id}
                  >
                    <div className="relative h-[70px] w-[70px] cursor-pointer rounded-full bg-blue-200">
                      {item.GroupPhoto ? (
                        <picture>
                          <img
                            src={item.GroupPhoto}
                            alt={item.GroupPhoto}
                            className="h-[70px] w-[70px] rounded-full object-cover shadow-lg"
                          />
                        </picture>
                      ) : (
                        <picture>
                          <img
                            src={Friend}
                            alt={Friend}
                            className="h-[70px] w-[70px] rounded-full object-cover shadow-lg"
                          />
                        </picture>
                      )}
                    </div>

                    <div className="flex w-[45%] flex-col items-start justify-center text-wrap">
                      <h1 className="text-custom-black font-Poppins text-xl font-semibold">
                        {item.GroupName ? item.GroupName : "Name Xyz"}
                      </h1>
                      <p className="font-Poppins text-[18px] font-medium text-[#4D4D4D] opacity-75">
                        {item.GroupTagName ? item.GroupTagName : "hello xyz"}
                      </p>
                    </div>

                    <div>
                      <div className="flex gap-x-3">
                        <button
                          className="relative inline-flex items-center rounded-lg bg-gradient-to-r from-[#3248c2] to-[#0633e7] px-5 py-2.5 text-center text-sm font-medium text-white"
                          onClick={() => GroupReqAccept(item)}
                        >
                          Accept
                        </button>

                        <button
                          className="relative inline-flex items-center rounded-lg bg-gradient-to-r from-[#ff5555] to-[#c75723] px-5 py-2.5 text-center text-sm font-medium text-white"
                          onClick={() => GroupReqReject(item)}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </Modal>
        </div>
        {/* Modal codes End */}
      </div>
    </>
  );
};

export default MyGroups;
